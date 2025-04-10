"use client";

import React from "react";
import { useList, useGetIdentity } from "@refinedev/core";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";
import { Flight } from "@mui/icons-material";
import { parseISO } from "date-fns";
import { Booking, LogBookEntry } from "@/components/types";
import { useTheme } from "@customHooks/useTheme";
import { useTranslations } from "next-intl";

// --------------------
// Front Page Component
// --------------------
export default function FlightStats() {
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

  // Fetch logbook data
  const { data: logbookData, isLoading: logbookLoading } = useList<LogBookEntry>({
    resource: "logbook",
    filters: [
      { field: "profile_id", operator: "eq", value: currentUserId },
    ],
    meta: { select: "*" },
  });
  const logbookEntries = logbookData?.data ?? [];

  // Prepare chart data
  const currentYear = currentDate.getFullYear();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const monthlyData = monthNames.map((month, index) => {
    const entriesThisMonth = logbookEntries.filter(entry => {
      // Add null check for entry and entry.date
      if (!entry || !entry.flight_date) return false;
      
      const entryDate = parseISO(entry.flight_date);
      return entryDate.getFullYear() === currentYear && entryDate.getMonth() === index;
    });
    
    const totalHours = entriesThisMonth.reduce((sum, entry) => {
      // Add null check for flightHours
      return sum + (entry?.flightHours || 0);
    }, 0);
    
    return {
      month,
      flightHours: totalHours,
    };
  });

  // Calculate total flight hours
  const totalFlightHours = logbookEntries.reduce((sum, entry) => sum + entry.flightHours, 0);


  return (
    <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
            <Flight sx={{ verticalAlign: 'middle', mr: 1 }} />
            {t("YourFlightStatistics")} 
        </Typography>

        <Grid container spacing={3}>
            {/* Flight Hours Chart */}
            <Grid item xs={12} md={8}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {t("MonthlyFlightHours")} ({currentYear})
                </Typography>
                <Box sx={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                            <XAxis 
                                dataKey="month" 
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                            />
                            <YAxis 
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                            />
                            <RechartsTooltip 
                                contentStyle={{ 
                                    fontSize: 12,
                                    borderRadius: 4,
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                }}
                                formatter={(value) => [`${value} hours`, "Flight Hours"]}
                                labelFormatter={(label) => `Month: ${label}`}
                            />
                            <Bar 
                                dataKey="flightHours" 
                                fill="#1976d2" 
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Grid>
            
            {/* Summary Stats */}
            <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {t("FlightSummary")}
            </Typography>
            <Stack spacing={2}>
                <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
                <Typography variant="body2" color="text.secondary">
                  {t("TotalFlightHours")}
                </Typography>
                <Typography variant="h4">
                    {totalFlightHours.toFixed(1)}
                </Typography>
                </Paper>
                
                <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
                <Typography variant="body2" color="text.secondary">
                {t("FlightsThisYear")}
                </Typography>
                <Typography variant="h4">
                    {logbookEntries.filter(e => parseISO(e.flight_date).getFullYear() === currentYear).length}
                </Typography>
                </Paper>
                
                <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
                <Typography variant="body2" color="text.secondary">
                {t("UpcomingBookings")}
                </Typography>
                <Typography variant="h4">
                    {myBookings.length}
                </Typography>
                </Paper>
            </Stack>
            </Grid>
        </Grid>
    </Paper>
  );
}