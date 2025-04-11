"use client";

import React from "react";
import {
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import { useTheme } from "@customHooks/useTheme";


// --------------------
// Booking Time Component
// --------------------
export default function BookingTime({ start, end }: { start: string; end: string }) {
  const theme = useTheme();
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

  return (
    <Stack>
      <Typography variant="body2">
        {format(startDate, 'MMM d, yyyy')}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <AccessTime fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
        </Typography>
        <Chip 
          label={`${duration.toFixed(1)}h`} 
          size="small" 
          color="primary"
          sx={{ ml: 1 }}
        />
      </Stack>
    </Stack>
  );
}