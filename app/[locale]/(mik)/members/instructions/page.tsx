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
  Button,
  Paper,
} from "@mui/material";
import {
  Description as DocumentIcon,
  Flight as FlightIcon,
  Email as EmailIcon,
  Download as DownloadIcon
} from "@mui/icons-material";
import { useTheme } from "@customHooks/useTheme";

const InstructionsPage: React.FC = () => {
  const t = useTranslations("Instructions");
  const theme = useTheme();

  const operationalGuides = [
    {
      title: "Aircraft Operations Guide",
      description: "Use of club equipment requires familiarization with and commitment to the equipment instructions.",
      version: "Revision 6, published 28.5.2022",
      download: "/documents/Toimintaohjeet_lentokalustolle.pdf",
      icon: <FlightIcon color="primary" />
    },
    {
      title: "EFNU Operations Guide",
      description: "Instructions for using club equipment at Nummenmäki. Does not replace the airfield operations manual (see https://efnu.fi/)",
      download: "/documents/EFNU-toimintaohjeet.pdf",
      icon: <FlightIcon color="primary" />
    },
    {
      title: "EFHK Operations Guide (Temporary)",
      description: "Instructions for flying from Helsinki-Vantaa can be found in the operations guide",
      download: "/documents/EFHK-toimintaohjeet.pdf",
      icon: <FlightIcon color="primary" />
    },
    {
      title: "EFIK Operations Guide (Not in use)",
      description: "Instructions for flying from Kiikala can be found in the operations guide",
      version: "Version 5, published 22.12.2021",
      download: "/documents/EFIK-toimintaohjeet.pdf",
      icon: <FlightIcon color="primary" />
    },
    {
      title: "EFHV Operations Guide (Not in use)",
      description: "Instructions for flying from Hyvinkää can be found in the operations guide",
      download: "/documents/EFHV-toimintaohjeet.pdf",
      icon: <FlightIcon color="primary" />
    },
    {
      title: "EFPR Operations Guide (Not in use)",
      description: "Instructions for flying from Pyhtää can be found in the operations guide",
      download: "/documents/EFPR-toimintaohje.pdf",
      icon: <FlightIcon color="primary" />
    },
    {
      title: "EFLA Operations Guide (Not in use)",
      description: "Instructions for flying from Vesivehmaa can be found in the operations guide",
      download: "/documents/EFLA-toimintaohjeet.pdf",
      icon: <FlightIcon color="primary" />
    }
  ];

  const efprCharts = [
    { name: "EFPR Aerodrome Chart (AD)", download: "/documents/EFPR_AD.pdf" },
    { name: "EFPR Landing Chart (LDG)", download: "/documents/EFPR_LDG.pdf" },
    { name: "EFPR Visual Approach Chart (VAC)", download: "/documents/EFPR_VAC.pdf" }
  ];

  const expenseForms = [
    { name: "Expense Reimbursement Form (PDF)", download: "/documents/Kulukorvauslomake.pdf" },
    { name: "Expense Reimbursement Form (DOCX)", download: "/documents/Kulukorvauslomake.docx" },
    { name: "Guidelines for Ferry Flights and Reimbursements", download: "/documents/Ohje-siirtolentoihin-ja-kulukorvauksiin-5.pdf" }
  ];

  const malmiGuide = {
    title: "Malmi Airport General Guide",
    description: "Read here the general guidelines for Malmi Airport. Pay special attention to the landing fee and circuit reservation fee.",
    download: "/documents/Malmin_lentokentän_yleisohje.pdf"
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
          {t("title")}
        </Typography>
        <Typography variant="body1">
          {t("description")}
        </Typography>
      </Box>

      {/* Operational Guides */}
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        {t("operationalGuides")}
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {operationalGuides.map((guide, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  {guide.icon}
                  <Typography variant="h6" sx={{ fontWeight: 500, ml: 1 }}>
                    {guide.title}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {guide.description}
                </Typography>
                {guide.version && (
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                    {guide.version}
                  </Typography>
                )}
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  href={guide.download}
                  download
                >
                  {t("download")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* EFPR Charts */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        {t("efprCharts")}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {efprCharts.map((chart, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {chart.name}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DownloadIcon />}
                  href={chart.download}
                  download
                  fullWidth
                >
                  {t("download")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Expense Reimbursement */}
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        {t("expenseReimbursement")}
      </Typography>
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: theme.palette.grey[100] }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("expenseInstructions")}
        </Typography>
        <List dense>
          {expenseForms.map((form, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <DocumentIcon />
              </ListItemIcon>
              <ListItemText primary={form.name} />
              <Button
                size="small"
                startIcon={<DownloadIcon />}
                href={form.download}
                download
              >
                {t("download")}
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Malmi Guide */}
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        {t("malmiGuide")}
      </Typography>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
            {malmiGuide.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {malmiGuide.description}
          </Typography>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            href={malmiGuide.download}
            download
          >
            {t("downloadGuide")}
          </Button>
        </CardContent>
      </Card>

      {/* Submission Info */}
      <Paper elevation={2} sx={{ p: 3, bgcolor: theme.palette.info.light }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {t("submissionInfo")}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<EmailIcon />}
          href="mailto:laskutus@eko.fi"
          sx={{ mt: 1 }}
        >
          {t("submitExpenses")}
        </Button>
      </Paper>
    </Container>
  );
};

export default InstructionsPage;