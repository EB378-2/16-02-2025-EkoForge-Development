"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";
import {
  useGetIdentity,
  useList,
  useCreate,
  useUpdate,
  useDelete,
  HttpError,
} from "@refinedev/core";
import BookingModal from "@/components/BookingModal";
import { Booking, BookingResource, BookingInstructor } from "@/components/types";
import { useTheme } from "@components/functions/useTheme";


const flightTypeColors = {
  "X-Country": "green",
  "X-Country Training": "purple",
  "General": "darkblue",
  "Maintenances": "orange",
  "Training": "red"
};


// --------------------
// Main Calendar Component
// --------------------

export default function ResourceBookingCal() {
  const t = useTranslations("HomePage");
  const theme = useTheme();

  const { data: identity } = useGetIdentity<{ id: string }>();
  const currentUserId = identity?.id || "default-user";

  const { data: instructorData } = useList<BookingInstructor>({
    resource: "instructors",
    meta: { select: "*" },
  });
  const instructors = instructorData?.data || [];

  const {
    data: bookingsData,
    isLoading: isBookingsLoading,
    isError: isBookingsError,
    refetch: refetchBookings,
  } = useList<Booking, HttpError>({
    resource: "bookings",
    meta: { select: "*" },
  });
  const allBookings = bookingsData?.data || [];

  const { data: resourcesData } = useList<BookingResource, HttpError>({
    resource: "resources",
    meta: { select: "*" },
  });
  const resources = resourcesData?.data || [];

  const { mutate: createBookingMutate } = useCreate<Booking, HttpError>();
  const { mutate: updateBookingMutate } = useUpdate<Booking, HttpError>();
  const { mutate: deleteBookingMutate } = useDelete<Booking, HttpError>();

  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isEditable, setIsEditable] = useState(false);

  const isBookingOverlapping = (newBooking: Booking): boolean => {
    const newStart = new Date(newBooking.start_time);
    const newEnd = new Date(newBooking.end_time);
    return allBookings.some((existingBooking) => {
      if (existingBooking.resource_id !== newBooking.resource_id) return false;
      if (existingBooking.id && existingBooking.id === newBooking.id)
        return false;
      const existingStart = new Date(existingBooking.start_time);
      const existingEnd = new Date(existingBooking.end_time);
      return newStart < existingEnd && newEnd > existingStart;
    });
  };

  const handleEventClick = (info: any) => {
    const bookingId = info.event.id;
    const booking = allBookings.find((b) => b.id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setIsEditable(booking.profile_id === currentUserId);
      setModalOpen(true);
    }
  };

  const handleResourceDateSelect =
    (resourceId: string) => (selection: { start: Date; end: Date }) => {
      const newBooking: Booking = {
        profile_id: currentUserId,
        resource_id: resourceId,
        start_time: selection.start.toISOString(),
        end_time: selection.end.toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setSelectedBooking(newBooking);
      setIsEditable(true);
      setModalOpen(true);
    };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  const handleSaveBooking = (booking: Booking) => {
    if (isBookingOverlapping(booking)) {
      alert(
        "Booking times overlap with an existing booking. Please choose a different time."
      );
      return;
    }
    if (!booking.id) {
      const { id, ...bookingData } = booking;
      createBookingMutate(
        {
          resource: "bookings",
          values: bookingData,
        },
        {
          onSuccess: () => {
            refetchBookings();
            closeModal();
          },
          onError: (error) => {
            console.error("Error creating booking", error);
          },
        }
      );
    } else {
      updateBookingMutate(
        {
          resource: "bookings",
          id: booking.id,
          values: { ...booking, updated_at: new Date().toISOString() },
        },
        {
          onSuccess: () => {
            refetchBookings();
            closeModal();
          },
          onError: (error) => {
            console.error("Error updating booking", error);
          },
        }
      );
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    deleteBookingMutate(
      {
        resource: "bookings",
        id: bookingId,
      },
      {
        onSuccess: () => {
          refetchBookings();
          closeModal();
        },
        onError: (error) => {
          console.error("Error deleting booking", error);
        },
      }
    );
  };

  

  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel id="resource-multiselect-label">
          Select Resources
        </InputLabel>
        <Select
          labelId="resource-multiselect-label"
          multiple
          value={selectedResources}
          onChange={(e) =>
            setSelectedResources(
              typeof e.target.value === "string"
                ? e.target.value.split(",")
                : e.target.value
            )
          }
          input={<OutlinedInput label="Select Resources" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((value) => {
                const resource = resources.find((r) => r.id === value);
                return (
                  <Chip
                    key={value}
                    label={resource ? resource.name : value}
                  />
                );
              })}
            </Box>
          )}
        >
          {resources.map((resource) => (
            <MenuItem key={resource.id} value={resource.id}>
              {resource.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedResources.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 4 }}>
          {selectedResources.map((resourceId) => {
            const resource = resources.find((r) => r.id === resourceId);
            const events = allBookings
              .filter((booking) => booking.resource_id === resourceId)
              .map((booking) => ({
                id: booking.id,
                title: booking.title,
                start: booking.start_time,
                end: booking.end_time,
                color: booking.profile_id === currentUserId
                  ? "blue"
                  : (booking.flight_type && flightTypeColors[booking.flight_type as keyof typeof flightTypeColors]) || "gray",
                extendedProps: {
                  profile_id: booking.profile_id,
                  resource_id: booking.resource_id,
                },
              }));
            return (
              <Box
                key={resourceId}
                sx={{
                  flex: "1 1 300px",
                  backgroundColor: "background.paper",
                  borderRadius: 1,
                  p: 2,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Calendar for Resource: {resource?.name || resourceId}
                </Typography>
                <FullCalendar
                  timeZone="local"
                  nowIndicator
                  footerToolbar={{
                    right: "timeGridDay timeGridWeek dayGridMonth",
                  }}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridDay"
                  selectable
                  select={handleResourceDateSelect(resourceId)}
                  eventClick={handleEventClick}
                  events={events}
                  height="auto"
                />
              </Box>
            );
          })}
        </Box>
      )}

      <BookingModal
        open={modalOpen}
        booking={selectedBooking}
        isEditable={isEditable}
        instructors={instructors}
        onClose={closeModal}
        onSave={handleSaveBooking}
        onDelete={handleDeleteBooking}
      />
    </Box>
  );
}
