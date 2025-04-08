"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import {
  Flight as FlightIcon,
  Description as DocumentIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  Checklist as ChecklistIcon
} from "@mui/icons-material";
import { useTheme } from "@components/functions/useTheme";
import { useTranslations } from "next-intl";

export default function FlightStudentChecklist() {
  const t = useTranslations("StudentChecklist");
  const theme = useTheme();
  

  // Checklist items
  const beforeTraining = [
    `${t("sections.beforeTraining.items")}`
  ];

  const beforeFirstFlight = [
   `${t("sections.beforeFirstFlight.items")}`
  ];

  const beforeSoloFlight = [
    `${t("sections.beforeSoloFlight.items")}`
  ];

  const beforeFlightTest = [
    `${t("sections.beforeFlightTest.items")}`
  ];

  const licenseApplication = [
    `${t("sections.licenseApplication.items")}`
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Welcome Header */}
      <Paper elevation={3} sx={{ 
        p: 4, 
        mb: 4,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: theme.palette.primary.contrastText
      }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {t("welcome.title")}
        </Typography>
        <Typography variant="h5" component="h2">
          {t("welcome.subtitle")}
        </Typography>
      </Paper>

      {/* Introduction */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" paragraph>
        {t("introduction.paragraph1")}
        </Typography>
        <Typography variant="body1" paragraph>
        {t("introduction.paragraph2")}
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
        {t("introduction.importantNote")}
        </Typography>
      </Paper>

      {/* Main Checklist */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <ChecklistIcon sx={{ mr: 2 }} />
          {t("checklistTitle")}
        </Typography>

        {/* Before Training Starts */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{t("sections.beforeTraining.title")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {beforeTraining.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Checkbox edge="start" disabled />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
              <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
              {t("sections.beforeTraining.note")}
              </Typography>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Before First Flight */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{t("sections.beforeFirstFlight.title")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {beforeFirstFlight.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Checkbox edge="start" disabled />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Before Solo Flight */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{t("sections.beforeSoloFlight.title")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {beforeSoloFlight.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Checkbox edge="start" disabled />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Before Flight Test */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{t("sections.beforeFlightTest.title")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {beforeFlightTest.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Checkbox edge="start" disabled />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* License Application Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: theme.palette.primary.main }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <DocumentIcon sx={{ mr: 2 }} />
          {t("licenseApplication.title")}
        </Typography>
        <Typography variant="body1" paragraph>
        {t("licenseApplication.description")}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {licenseApplication.map((item, index) => (
            <Chip 
              key={index}
              label={item}
              variant="outlined"
              sx={{ mb: 1 }}
            />
          ))}
        </Box>

        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        {t("licenseApplication.note")}
        </Typography>
      </Paper>

      {/* Additional Information */}
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <PersonIcon sx={{ mr: 2 }} />
          {t("instructors.title")}
        </Typography>
        <Typography variant="body1" paragraph>
        {t("instructors.chiefInstructor")}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <FlightIcon sx={{ mr: 2 }} />
          {t("instructors.aircraftEquipment.title")}
        </Typography>
        <Typography variant="body1" paragraph>
        {t("instructors.aircraftEquipment.list")}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
        {t("instructors.lastUpdated")}
        </Typography>
      </Paper>
    </Container>
  );
}