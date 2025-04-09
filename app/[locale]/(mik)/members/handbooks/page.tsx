"use client";

import React from "react";
import { useTranslations } from "next-intl";
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
  Paper,
} from "@mui/material";
import { Description as DocumentIcon, Email as EmailIcon, GitHub as GitHubIcon } from "@mui/icons-material";
import { useTheme } from "@customHooks/useTheme";


const ManualsPage: React.FC = () => {
  const t = useTranslations("Manuals");
  const theme = useTheme();
  const aircraftManuals = [
    {
      registration: "OH-IHQ",
      type: "Diamond DV20",
      equipment: "GOVY/S (GPS, VHF, VOR, 8.33 kHz channel spacing and Mode S transponder)",
      documents: [
        { name: "Airplane Flight Manual - DV20 with Rotax 912 S", date: "12.11.2001", format: "PDF" },
        { name: "Garmin GNS430 Pilot's Guide", date: "12/2009", format: "PDF" },
        { name: "Garmin GNS430 Quick Reference Guide", date: "", format: "PDF" },
        { name: "Maintenance Manual", date: "29.03.2022", format: "HTML" },
        { name: "Official Documents", date: "31.03.2024", format: "PDF" },
        { name: "Weight and Balance Certificate", date: "14.10.2010", format: "PDF" },
        { name: "Checklist", date: "15.05.2014", format: "PDF" },
        { name: "Web-based Load Calculator", date: "", format: "HTML" },
        { name: "Skydemon Profile", date: "", format: "ZIP" },
        { name: "Questionnaire for DV20 Katana Rotax", date: "11.06.2014", format: "PDF" }
      ],
      mailingList: "https://groups.google.com/a/mik.fi/forum/#!forum/ihq-info"
    },
    {
      registration: "OH-STL",
      type: "Diamond DA40 NG",
      equipment: "SDFGY/S (VHF, VOR, ILS, DME, ADF, GNSS, 8.33 kHz channel spacing and Mode S transponder)",
      documents: [
        { name: "Airplane Flight Manual", date: "12.03.2025", format: "PDF" },
        { name: "Temporary Revision TR-MÄM-40-1203/a - Door Latching and Locking", date: "18.02.2025", format: "PDF" },
        { name: "Supplement A01 - Garmin G1000 Avionics System", date: "20.04.2015", format: "PDF" },
        { name: "Supplement A13 - Bendix/King KAP 140 Autopilot System", date: "15.03.2011", format: "PDF" },
        { name: "Supplement O09 - Operation with D64-9028-11-01 Fuel Pumps", date: "30.09.2024", format: "PDF" },
        { name: "Supplement S04 - 406MHz Emergency Locator Transmitter Artex ME 406", date: "01.04.2010", format: "PDF" },
        { name: "Maintenance Manual", date: "15.07.2024", format: "HTML" },
        { name: "Official Documents", date: "13.03.2025", format: "PDF" },
        { name: "Checklist", date: "21.06.2016", format: "PDF" },
        { name: "Web-based Load Calculator (Finnish)", date: "", format: "HTML" },
        { name: "Skydemon Profile", date: "", format: "ZIP" },
        { name: "Questionnaire", date: "", format: "Online" }
      ],
      mailingList: "https://groups.google.com/a/mik.fi/forum/#!forum/stl-info"
    },
    {
      registration: "OH-PJH",
      type: "Rental Aircraft",
      equipment: "",
      documents: [
        { name: "Flight Manual", date: "", format: "PDF" },
        { name: "Supplement Garmin G5", date: "", format: "PDF" },
        { name: "Supplement MAC1700 Control/Display Unit", date: "", format: "PDF" },
        { name: "Checklist", date: "", format: "PDF" },
        { name: "Type Training / Questionnaire", date: "", format: "" }
      ]
    }
  ];

  const otherResources = [
    {
      category: "General",
      items: [
        { name: "GPS Logger Ventus G730 User Manual", date: "", format: "PDF" },
        { name: "VFR Reporting Points", date: "13.11.2014", format: "PDF" },
        { name: "Traficom Questionnaire Form (LU3240)", date: "", format: "PDF" }
      ]
    },
    {
      category: "Simulator",
      items: [
        { name: "DA40NG Simulator User Guide (DRAFT 14.4.2018)", date: "", format: "PDF" }
      ]
    },
    {
      category: "Maintenance",
      items: [
        { name: "Part-M Pilot Owner Maintenance", date: "", format: "PDF" },
        { name: "Rental Aircraft User Guide", date: "", format: "PDF" }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          {t("title")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("description1")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("description2")}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button 
            variant="outlined" 
            startIcon={<EmailIcon />}
            href="mailto:kalusto@mik.fi"
          >
            {t("reportErrors")}
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<GitHubIcon />}
            href="https://github.com/MIK-dev-team/aircraft-profiles"
            target="_blank"
          >
            {t("githubProfiles")}
          </Button>
        </Box>
        <Paper elevation={2} sx={{ p: 3, mb: 4, bgcolor: theme.palette.warning.light }}>
          <Typography variant="body1" fontWeight="bold">
            {t("notice")}
          </Typography>
          <Typography variant="body2">
            {t("noticeText")}
          </Typography>
        </Paper>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        {t("aircraftCommunication")}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {aircraftManuals.filter(a => a.mailingList).map((aircraft) => (
          <Grid item xs={12} sm={6} md={4} key={aircraft.registration}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {aircraft.registration}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {aircraft.type}
                </Typography>
                {aircraft.mailingList && (
                  <Button 
                    variant="contained" 
                    size="small" 
                    href={aircraft.mailingList}
                    target="_blank"
                    fullWidth
                  >
                    {t("mailingList")}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {aircraftManuals.map((aircraft) => (
        <Box key={aircraft.registration} sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            {aircraft.registration} - {aircraft.type}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            {t("flightPlanEquipment")}: {aircraft.equipment}
          </Typography>
          
          <Grid container spacing={3}>
            {aircraft.documents.map((doc, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <DocumentIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {doc.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="caption" color="text.secondary">
                        {doc.date}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {doc.format}
                      </Typography>
                    </Box>
                    <Button 
                      size="small" 
                      sx={{ mt: 1 }}
                      // In a real app, you would link to the actual document
                      href={`/documents/${aircraft.registration}/${doc.name.replace(/\s+/g, '-').toLowerCase()}`}
                    >
                      {t("download")}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        {t("otherResources")}
      </Typography>
      <Grid container spacing={3}>
        {otherResources.map((section) => (
          <Grid item xs={12} md={6} key={section.category}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {section.category}
                </Typography>
                <List dense>
                  {section.items.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <DocumentIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.name} 
                        secondary={`${item.date} • ${item.format}`} 
                      />
                      <Button 
                        size="small" 
                        // In a real app, you would link to the actual document
                        href={`/documents/other/${item.name.replace(/\s+/g, '-').toLowerCase()}`}
                      >
                        {t("view")}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ManualsPage;