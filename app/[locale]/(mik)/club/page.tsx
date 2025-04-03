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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
  useTheme,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Flight as FlightIcon,
  Groups as GroupIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Euro as EuroIcon,
  CalendarToday as CalendarIcon,
  ExpandMore as ExpandMoreIcon,
  History as HistoryIcon,
} from "@mui/icons-material";

const ClubPage: React.FC = () => {
  const t = useTranslations("Club");
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

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

  const boardMembers = [
    { name: "Aleksi Pöytäkangas", role: "Puheenjohtaja, Kalustovastaava (OH-STL)", phone: "050 466 1414", email: "aleksi.poytakangas@mik.fi" },
    { name: "Jouni Pyhäjärvi", role: "Varapuheenjohtaja, simulaattorivastaava", phone: "050 487 3733", email: "jouni.pyhajarvi@mik.fi" },
    { name: "Ville Karhunen", role: "Sihteeri, Koulutuskoordinaattori", phone: "044 953 7376", email: "ville.karhunen@mik.fi" },
    { name: "Mika Salo", role: "Rahastonhoitaja", phone: "040 066 3705", email: "mika.salo@mik.fi" },
    { name: "Jani Grundström", role: "Kalustovastaava (OH-IHQ)", phone: "045 274 6777", email: "jani.grundstrom@mik.fi" },
    { name: "Kalle Autio", role: "Kalustovastaava (OH-STL)", phone: "", email: "kalle.autio@mik.fi" },
    { name: "Johan Stude", role: "Kerhomestari", phone: "050 368 4044", email: "johan.stude@mik.fi" },
    { name: "Dina Podgorica", role: "Hallituksen jäsen", phone: "040 563 6305", email: "dina.podgorica@mik.fi" },
    { name: "Oskar Luukka", role: "Kalustovastaava (OH-IH!)", phone: "040 868 1259", email: "oskar.luukka@mik.fi" },
    { name: "Miro Brunou", role: "Hallituksen jäsen", phone: "044 357 6280", email: "miro.brunou@mik.fi" },
    { name: "Mika järvenpää", role: "Hallituksen jäsen", phone: "", email: "mika.jarvenpaa@mik.fi" },
  ];

  const membershipFees = [
    { type: "Täysjäsen", joiningFee: "125 €", annualFee: "85 €", flightRights: "Kyllä", equipmentFee: "135 € / vuosi" },
    { type: "Nuorisojäsen*", joiningFee: "25 €", annualFee: "50 €", flightRights: "Kyllä", equipmentFee: "135 € / vuosi" },
    { type: "Kannatusjäsen**", joiningFee: "25 €", annualFee: "85 €", flightRights: "Ei", equipmentFee: "–" },
  ];

  const flightFees = [
    { aircraft: "OH-STL DA40NG", rate: "216 € / h" },
    { aircraft: "OH-IHQ DV20", rate: "147 € / h" },
    { aircraft: "OH-PJH PA28", rate: "228 € / h" },
  ];

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
            <GroupIcon fontSize="large" />
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
        {/* About Section */}
        <motion.div variants={fadeInUp}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                {t("aboutTitle")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {t("aboutText1")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {t("aboutText2")}
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ p: 2, height: "100%" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      {t("activeActivities")}
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <FlightIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("activity1")} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FlightIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("activity2")} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <FlightIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("activity3")} />
                      </ListItem>
                    </List>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ p: 2, height: "100%" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      {t("generalInfo")}
                    </Typography>
                    <Typography variant="body1">
                      {t("generalInfoText")}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                size="large"
                href="/membership"
                sx={{ mt: 2 }}
              >
                {t("joinNow")}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div variants={fadeInUp}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                {t("contactTitle")}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {t("contactText")}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {t("emailContacts")}
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText primary="info@mik.fi" secondary={t("generalInquiries")} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText primary="kalusto@mik.fi" secondary={t("equipmentMatters")} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText primary="simulaattori@mik.fi" secondary={t("simulator")} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText primary="laskutus@mik.fi" secondary={t("billing")} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText primary="koulutus@mik.fi" secondary={t("training")} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    {t("postalAddress")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Malmin Ilmailukerho ry<br />
                    Helsinki-Malmin lentoasema<br />
                    00700 HELSINKI
                  </Typography>
                  
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
                    {t("bankInfo")}
                  </Typography>
                  <Typography variant="body1">
                    Y-tunnus: Y-1559788-2<br />
                    Tilinumero: FI10 8000 1870 5921 37<br />
                    Verkkolaskuosoite: 003715597882192
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Board Members Section */}
        <motion.div variants={fadeInUp}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                {t("boardTitle")} 2025
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("name")}</TableCell>
                      <TableCell>{t("role")}</TableCell>
                      <TableCell>{t("phone")}</TableCell>
                      <TableCell>{t("email")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {boardMembers.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          {member.phone && (
                            <Button
                              size="small"
                              href={`tel:${member.phone}`}
                              startIcon={<PhoneIcon fontSize="small" />}
                              sx={{ textTransform: "none" }}
                            >
                              {member.phone}
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            href={`mailto:${member.email}`}
                            startIcon={<EmailIcon fontSize="small" />}
                            sx={{ textTransform: "none" }}
                          >
                            {member.email}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Membership Fees Section */}
        <motion.div variants={fadeInUp}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                {t("membershipFeesTitle")} 2024
              </Typography>
              
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("memberType")}</TableCell>
                      <TableCell align="right">{t("joiningFee")}</TableCell>
                      <TableCell align="right">{t("annualFee")}</TableCell>
                      <TableCell align="right">{t("flightRights")}</TableCell>
                      <TableCell align="right">{t("equipmentFee")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {membershipFees.map((fee, index) => (
                      <TableRow key={index}>
                        <TableCell>{fee.type}</TableCell>
                        <TableCell align="right">{fee.joiningFee}</TableCell>
                        <TableCell align="right">{fee.annualFee}</TableCell>
                        <TableCell align="right">{fee.flightRights}</TableCell>
                        <TableCell align="right">{fee.equipmentFee}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Typography variant="body2" sx={{ mb: 2, fontStyle: "italic" }}>
                * {t("youthMemberNote")}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, fontStyle: "italic" }}>
                ** {t("supportMemberNote")}
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                ***{t("feeReductionNote")}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Flight Fees Section */}
        <motion.div variants={fadeInUp}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                {t("flightFeesTitle")}
              </Typography>
              
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("aircraft")}</TableCell>
                      <TableCell align="right">{t("rate")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {flightFees.map((fee, index) => (
                      <TableRow key={index}>
                        <TableCell>{fee.aircraft}</TableCell>
                        <TableCell align="right">{fee.rate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("billingDetails1")}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("billingDetails2")}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("billingDetails3")}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {t("billingDetails4")}
              </Typography>
              <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                {t("note")}: {t("logbookNote")}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* History Section */}
        <motion.div variants={fadeInUp}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
                <HistoryIcon />
                {t("historyTitle")}
              </Typography>
              
              <Accordion expanded={expanded === 'history'} onChange={handleChange('history')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{t("clubHistory")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {t("historyText1")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {t("historyText2")}
                  </Typography>
                  <Typography variant="body1">
                    {t("historyText3")}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded === 'chairmen'} onChange={handleChange('chairmen')} sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{t("pastChairmen")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    <ListItem>Aleksi Pöytäkangas 2022-</ListItem>
                    <ListItem>Juha Junttila 2022-2022</ListItem>
                    <ListItem>Niko Ikonen 2020-2021</ListItem>
                    <ListItem>Ville Repo 2016–2019</ListItem>
                    <ListItem>Miika Asunta 2014–2015</ListItem>
                    <ListItem>Ville Repo 2012–2013</ListItem>
                    <ListItem>Sami Launonen 2010–2011</ListItem>
                    <ListItem>Marko Einamo 2008–2009</ListItem>
                    <ListItem>John Charles 2006–2007</ListItem>
                    <ListItem>Ilkka Koho 2004–2005</ListItem>
                    <ListItem>Tero Auranen 2002–2003</ListItem>
                    <ListItem>Marko Einamo 2000–2001</ListItem>
                    <ListItem>Markku Blomqvist 1998–1999</ListItem>
                    <ListItem>Pekka Hämäläinen 1994–1997</ListItem>
                    <ListItem>Aimo Päivöke 1991–1993</ListItem>
                    <ListItem>Ensio Kalske 1988–1990</ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default ClubPage;