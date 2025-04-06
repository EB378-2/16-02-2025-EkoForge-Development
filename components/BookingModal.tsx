"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { formatDateForInput } from "@/components/functions/FormatFunctions";
import { InstructorName } from "@/components/functions/FetchFunctions";

const flightTypeOptions = Array.from(
    new Set(["Private", "Commercial", "Cargo", "Training"])
  );

export interface Booking {
    id?: string; // Optional for new records.
    profile_id: string;
    resource_id: string;
    start_time: string;
    end_time: string;
    title?: string;
    notes?: string;
    instructor_id?: string;
    flight_type?: string;
    created_at?: string;
    updated_at?: string;
}
  
export interface Resource {
    id: string;
    name: string;
}

export interface Instructor {
    id: string;
    name: string;
}

interface BookingModalProps {
  open: boolean;
  booking: Booking | null;
  isEditable: boolean;
  instructors: Instructor[];
  onClose: () => void;
  onSave: (booking: Booking) => void;
  onDelete: (bookingId: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  open,
  booking,
  isEditable,
  instructors,
  onClose,
  onSave,
  onDelete,
}) => {
  const [localBooking, setLocalBooking] = useState<Booking | null>(booking);
  const [error, setError] = useState("");

  useEffect(() => {
    setLocalBooking(booking);
    setError("");
  }, [booking]);

  if (!localBooking) return null;

  const handleChange = (field: keyof Booking, value: string) => {
    setLocalBooking((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSaveClick = () => {
    if (!localBooking.start_time || !localBooking.end_time) {
      setError("Start and End times are required.");
      return;
    }
    onSave(localBooking);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: { xs: "90%", sm: 400 },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {localBooking.id
            ? isEditable
              ? "Edit Booking"
              : "View Booking"
            : "New Booking"}
        </Typography>
        <TextField
          fullWidth
          label="Start Time"
          type="datetime-local"
          value={formatDateForInput(localBooking.start_time)}
          onChange={(e) =>
            handleChange("start_time", new Date(e.target.value).toISOString())
          }
          sx={{ mb: 2 }}
          disabled={!isEditable}
        />
        <TextField
          fullWidth
          label="End Time"
          type="datetime-local"
          value={formatDateForInput(localBooking.end_time)}
          onChange={(e) =>
            handleChange("end_time", new Date(e.target.value).toISOString())
          }
          sx={{ mb: 2 }}
          disabled={!isEditable}
        />

        {/* Additional Details Section */}
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Additional Details
        </Typography>
        <TextField
          fullWidth
          label="Title"
          value={localBooking.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          sx={{ mb: 2 }}
          disabled={!isEditable}
        />
        <TextField
          fullWidth
          label="Notes"
          value={localBooking.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
          sx={{ mb: 2 }}
          multiline
          rows={3}
          disabled={!isEditable}
        />
        <FormControl fullWidth sx={{ mb: 2 }} disabled={!isEditable}>
          <InputLabel id="instructor-label">Instructor</InputLabel>
          <Select
            labelId="instructor-label"
            value={localBooking.instructor_id || ""}
            label="Instructor"
            onChange={(e) =>
              handleChange("instructor_id", e.target.value as string)
            }
          >
            {instructors.length > 0 ? (
              instructors.map((instr) => (
                <MenuItem key={instr.id} value={instr.id}>
                  <InstructorName instructorId={instr.id} />
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Loading instructors...</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }} disabled={!isEditable}>
          <InputLabel id="flight-type-label">Flight Type</InputLabel>
          <Select
            labelId="flight-type-label"
            value={localBooking.flight_type || ""}
            label="Flight Type"
            onChange={(e) =>
              handleChange("flight_type", e.target.value as string)
            }
          >
            {flightTypeOptions.map((ft) => (
              <MenuItem key={ft} value={ft}>
                {ft}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            Error: {error}
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {isEditable && (
            <>
              <Button variant="contained" onClick={handleSaveClick}>
                Save
              </Button>
              {localBooking.id && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(localBooking.id!)}
                >
                  Delete
                </Button>
              )}
            </>
          )}
          <Button variant="outlined" onClick={onClose}>
            {isEditable ? "Cancel" : "Close"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookingModal;