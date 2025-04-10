"use client";

import React from "react";
import Link from "next/link";
import {useList, useGetIdentity } from "@refinedev/core";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Chip,
  Skeleton,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  CalendarToday,
  Flight,
  Add
} from "@mui/icons-material";
import { ResourceName } from "@/components/functions/FetchFunctions";
import { Booking } from "@/components/types";
import { useTheme } from "@customHooks/useTheme";
import BookingTime from "@/components/Members/Dashboard/BookingTime";
import { useTranslations } from "next-intl";

export default function UpComingBookings() {
      const theme = useTheme();
      const t = useTranslations("Dashboard");
      // Get current user identity
      const { data: identityData } = useGetIdentity<{ id: string }>();
      const currentUserId = identityData?.id;
      const currentDate = new Date();
    
      // Fetch upcoming bookings
      const { data: bookingsData, isLoading: bookingsLoading } = useList<Booking>({
        resource: "bookings",
        filters: [
          { field: "profile_id", operator: "eq", value: currentUserId },
          { field: "start_time", operator: "gte", value: currentDate.toISOString() },
        ],
        sorters: [{ field: "start_time", order: "asc" }],
        meta: { select: "*" },
      });
      const myBookings = bookingsData?.data ?? [];

      // Define DataGrid columns for bookings
      const bookingColumns: GridColDef[] = [
        {
          field: "resource",
          headerName: "Aircraft",
          width: 120,
          renderCell: (params) => <ResourceName id={params.row.resource_id} />,
        },
        {
          field: "time",
          headerName: "Date & Time",
          width: 200,
          renderCell: (params) => (
            <BookingTime start={params.row.start_time} end={params.row.end_time} />
          ),
        },
        {
          field: "type",
          headerName: "Type",
          width: 120,
          renderCell: (params) => (
            <Chip 
              label={params.row.flight_type || "General"} 
              size="small" 
              color="secondary"
            />
          ),
        },
        {
          field: "actions",
          headerName: "Actions",
          width: 100,
          renderCell: (params) => (
            <Button 
              variant="outlined" 
              size="small" 
              component={Link}
              href={`/members/bookings/edit/${params.row.id}`}
            >
              {t("view")} 
            </Button>
          ),
        },
      ];
    
    return (
        <Paper sx={{ p: 3, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                <CalendarToday sx={{ verticalAlign: 'middle', mr: 1 }} />
                {t("YourUpcomingBookings")} 
                </Typography>
                <Tooltip title="New booking">
                <IconButton 
                    color="primary" 
                    component={Link}
                    href="/members/bookings"
                >
                    <Add />
                </IconButton>
                </Tooltip>
            </Stack>

            {bookingsLoading ? (
                <Stack spacing={1}>
                {[1, 2, 3].map((item) => (
                    <Skeleton key={item} variant="rectangular" height={80} />
                ))}
                </Stack>
            ) : myBookings.length > 0 ? (
                <>
                <Box sx={{ height: 500 }}>
                    <DataGrid
                    rows={myBookings}
                    columns={bookingColumns}
                    pageSizeOptions={[5, 10]}
                    initialState={{
                        pagination: {
                        paginationModel: { pageSize: 5 },
                        },
                    }}
                    getRowId={(row) => row.id}
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-cell': {
                        py: 1,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                        bgcolor: 'background.default',
                        },
                    }}
                    />
                </Box>
                <Button 
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2 }}
                    component={Link}
                    href="/members/bookings"
                >
                    {t("ViewAllBookings")} 
                </Button>
                </>
            ) : (
                <Box textAlign="center" py={4}>
                <Flight fontSize="large" color="action" sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="body1" color="text.secondary" mb={2}>
                  {t("NoUpcomingBookings")} 
                </Typography>
                <Button 
                    variant="contained"
                    component={Link}
                    href="/members/bookings"
                    startIcon={<Add />}
                >
                    {t("BookFlight")} 
                </Button>
                </Box>
            )}
        </Paper>
    )
}