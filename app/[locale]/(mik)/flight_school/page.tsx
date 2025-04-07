"use client";

import React from "react";
import { useList, useShow } from "@refinedev/core";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
  useTheme,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  Flight as FlightIcon,
  Person as PersonIcon,
  Euro as EuroIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { ProfileName, ProfilePhone } from "@components/functions/FetchFunctions";
import { useColorMode } from "@contexts/color-mode";
import { getTheme } from "@theme/theme";


const FlightSchoolPage: React.FC = () => {
  const t = useTranslations("FlightSchool");
  const { mode } = useColorMode();
  const theme = getTheme(mode);

  // Fetch instructors data
  const { data: instructorsData } = useList({
    resource: "instructors",
    pagination: { pageSize: 100 },
  });

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
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

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={7}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Training Overview */}
            <motion.div variants={fadeInUp}>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <SchoolIcon />
                    {t("trainingTitle")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {t("trainingDescription")}
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          borderLeft: `4px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: theme.palette.primary.main,
                            }}
                          >
                            LAPL(A)
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <EuroIcon fontSize="small" />
                            <Typography>
                              {t("from")} 8 500 €
                            </Typography>
                          </Box>
                          <List dense sx={{ py: 0 }}>
                            <ListItem sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <FlightIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={`30 ${t("flightHours")}`}
                              />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <PersonIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={t("upTo3Passengers")}
                              />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card
                        variant="outlined"
                        sx={{
                          height: "100%",
                          borderLeft: `4px solid ${theme.palette.secondary.main}`,
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: theme.palette.secondary.main,
                            }}
                          >
                            PPL(A)
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <EuroIcon fontSize="small" />
                            <Typography>
                              {t("from")} 11 800 €
                            </Typography>
                          </Box>
                          <List dense sx={{ py: 0 }}>
                            <ListItem sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <FlightIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={`45 ${t("flightHours")}`}
                              />
                            </ListItem>
                            <ListItem sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <PersonIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={t("internationalFlights")}
                              />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {t("paymentInfo")}
                  </Typography>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {t("additionalFees")}
                  </Typography>

                  <Box sx={{ bgcolor: theme.palette.grey[100], color: theme.palette.strong.black, p: 2, borderRadius: 1, mb: 3 }}>
                    <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                      {t("priceUpdate")} 22.10.2023
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<EmailIcon />}
                    sx={{ mr: 2, mb: 2 }}
                    href="mailto:koulutus@mik.fi"
                  >
                    {t("contactEmail")}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PhoneIcon />}
                    href="tel:+358445006655"
                  >
                    Rami Sadik +358 44 500 6655
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Club Info */}
            <motion.div variants={fadeInUp}>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <FlightIcon />
                    {t("clubTitle")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {t("clubDescription1")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {t("clubDescription2")}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mt: 3, mb: 2 }}
                  >
                    LAPL(A)
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {t("laplDescription")}
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mt: 3, mb: 2 }}
                  >
                    PPL(A)
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {t("pplDescription")}
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 3 }}>
                    {t("ageRequirement")}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </Grid>

        {/* Sidebar with Instructors */}
        <Grid item xs={12} md={5}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card sx={{ position: "sticky", top: 20 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <PersonIcon />
                  {t("instructorsTitle")}
                </Typography>

                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>{t("name")}</TableCell>
                        <TableCell align="right">{t("phone")}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {instructorsData?.data.map((instructor: any) => (
                        <TableRow key={instructor.id}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <ProfileName profileId={instructor.profile_id} />
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              size="small"
                              href={`tel:${instructor.phone}`}
                              startIcon={<PhoneIcon fontSize="small" />}
                              sx={{ textTransform: "none" }}
                            >
                              <ProfilePhone profileId={instructor.profile_id}/> 
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {t("instructorsInfo")}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<PhoneIcon />}
                    href="tel:+358445006655"
                  >
                    {t("contactChiefInstructor")}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlightSchoolPage;