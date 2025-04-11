"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import {
  Article,
  AirplaneTicket,
  FlightLand,
} from "@mui/icons-material";
import { useTheme } from "@customHooks/useTheme";
import UpComingBookings from "@components/(MIK)/Members/Dashboard/UpComingBookings";
import BlogSection from "@components/(MIK)/Members/Dashboard/BlogSection";
import FlightStats from "@components/(MIK)/Members/Dashboard/FlightStats";
import { ProfileName } from "@components/functions/FetchFunctions";
import { useGetIdentity } from "@refinedev/core";

// --------------------
// Front Page Component
// --------------------
export default function FrontPage() {
  const theme = useTheme();
  const t = useTranslations("Dashboard");
  const { data: identityData } = useGetIdentity<{ id: string }>()

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Left Column - Blog and Stats */}
        <Grid item xs={12} md={8}>
          {/* Welcome Section */}
          <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <Typography variant="h5" gutterBottom>
              {t("WelcomeBack")} <ProfileName profileId={identityData?.id || ''} />!

            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
            {t("Subtitle")}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<AirplaneTicket />}
                component={Link}
                href="/members/bookings"
              >
                {t("NewBooking")}
              </Button>
              <Button 
                variant="outlined" 
                sx={{ color: 'primary.contrastText', borderColor: 'primary.contrastText' }}
                startIcon={<Article />}
                component={Link}
                href="/members/blogs/create"
              >
                {t("WritePost")}
              </Button>
              <Button 
                variant="outlined" 
                sx={{ color: 'primary.contrastText', borderColor: 'primary.contrastText' }}
                startIcon={<FlightLand />}
                component={Link}
                href="/members/logbook/create"
              >
                {t("LogFlight")}
              </Button>
            </Stack>
          </Paper>

          {/* Blog Section */}
          <BlogSection/>

          {/* Flight Stats Section */}
          <FlightStats/>
        </Grid>

        {/* Right Column - Bookings */}
        <Grid item xs={12} md={4}>
          <UpComingBookings/>
        </Grid>
      </Grid>
    </Box>
  );
}