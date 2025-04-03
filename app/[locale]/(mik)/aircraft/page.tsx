"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
  useTheme,
  Paper,
} from "@mui/material";
import {
  Flight as FlightIcon,
  AvTimer as TimerIcon,
  LocalGasStation as FuelIcon,
  Engineering as EngineIcon,
  Settings as EquipmentIcon,
  Groups as GroupIcon,
} from "@mui/icons-material";

const AircraftPage: React.FC = () => {
  const t = useTranslations("Aircraft");
  const theme = useTheme();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const aircraftData = [
    {
      id: 1,
      registration: "OH-STL",
      name: "Sierra Tango Lima",
      type: "Diamond DA40 NG",
      image: "/stl.jpeg", // Replace with actual image path
      description: t("da40Description"),
      specs: [
        { icon: <TimerIcon />, text: t("year") + ": 2007" },
        { icon: <EngineIcon />, text: t("power") + ": 170 Bhp" },
        { icon: <FuelIcon />, text: t("fuelConsumption") + ": ~20L/h" },
        { icon: <EquipmentIcon />, text: "Garmin G1000 glass cockpit" },
        { icon: <EquipmentIcon />, text: "KAP140 autopilot" },
      ],
      equipment: "SDFGY/S",
    },
    {
      id: 2,
      registration: "OH-IHQ",
      name: "Ihku",
      type: "Diamond DV20",
      image: "/ihq.jpeg", // Replace with actual image path
      description: t("dv20Description"),
      specs: [
        { icon: <TimerIcon />, text: t("year") + ": 2010" },
        { icon: <EngineIcon />, text: t("power") + ": 100 hp" },
        { icon: <FuelIcon />, text: t("fuelConsumption") + ": ~18L/h" },
        { icon: <EquipmentIcon />, text: "Garmin GNS 430 NAVCOM/GPS" },
        { icon: <EquipmentIcon />, text: "Garmin GTX 328 transponder" },
      ],
      equipment: "VOGY/S",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <FlightIcon fontSize="large" />
            {t("title")}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            {t("subtitle")}
          </Typography>
        </motion.div>
      </Box>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Aircraft Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 4,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FlightIcon />
            {t("ourAircraft")}
          </Typography>

          <Grid container spacing={4}>
            {aircraftData.map((aircraft) => (
              <Grid item xs={12} key={aircraft.id}>
                <motion.div variants={fadeInUp}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      height: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "100%", md: "40%" },
                        position: "relative",
                        minHeight: 300,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={aircraft.image}
                        alt={aircraft.type}
                        sx={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          bgcolor: "rgba(0,0,0,0.7)",
                          color: "white",
                          px: 2,
                          py: 1,
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          {aircraft.registration}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <CardContent>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 700, mb: 1 }}
                        >
                          {aircraft.name}
                        </Typography>
                        <Chip
                          label={aircraft.type}
                          color="primary"
                          size="small"
                          sx={{ mb: 2 }}
                        />
                        <Typography variant="body1" sx={{ mb: 3 }}>
                          {aircraft.description}
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 2 }}
                        >
                          {t("technicalSpecs")}
                        </Typography>
                        <List dense>
                          {aircraft.specs.map((spec, index) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                {spec.icon}
                              </ListItemIcon>
                              <ListItemText primary={spec.text} />
                            </ListItem>
                          ))}
                        </List>

                        <Typography sx={{ mt: 2, fontStyle: "italic" }}>
                          {t("flightPlanEquipment")}: {aircraft.equipment}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Simulator Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 4,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FlightIcon />
            {t("simulatorTitle")}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Box
                  sx={{
                    position: "relative",
                    height: 400,
                    borderRadius: 2,
                    overflow: "hidden",
                    mb: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHnwQ_ZGPZATEsohClUo9PaaI747KHNbz8Sw&s" // Replace with actual image path
                    alt="Flight Simulator"
                    sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                  />
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Diamond DA40 {t("simulator")}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {t("simulatorDescription1")}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {t("simulatorDescription2")}
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: theme.palette.grey[100],
                    color: theme.palette.strong.black,
                    p: 3,
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <GroupIcon />
                    {t("simulatorMembershipTitle")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {t("simulatorMembershipText")}
                  </Typography>
                  <Button
                    variant="contained"
                    href="/membership"
                    sx={{ mt: 1 }}
                  >
                    {t("joinNow")}
                  </Button>
                </Paper>

                <Typography variant="body1" sx={{ mb: 3 }}>
                  {t("simulatorContactText")}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<FlightIcon />}
                  href="mailto:simulator@mik.fi"
                >
                  {t("contactAboutSimulator")}
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default AircraftPage;