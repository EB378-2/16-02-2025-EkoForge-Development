"use client";

import React, { useState } from "react";
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
  Button,
  Divider,
  Chip,
  Avatar,
  useMediaQuery
} from "@mui/material";
import {
  RocketLaunch as VisionIcon,
  GppGood as ValuesIcon,
  AutoAwesome as InnovationIcon,
  Handshake as PartnershipIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  RocketLaunch,
  AutoAwesome
} from "@mui/icons-material";
import { useTheme } from "@customHooks/useTheme";

const AboutPage = () => {
  const t = useTranslations("About");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Enhanced animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1]
      } 
    }
  };

  const cardHover = {
    y: -8,
    boxShadow: `0 15px 30px ${theme.palette.primary.light}30`,
    transition: { duration: 0.3 }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 8,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mb: 3,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              {t("subtitle")}
            </Typography>
          </motion.div>
        </Box>

        {/* Our Story */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <Card sx={{ 
            mb: 6,
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            background: theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 45, 0.7)'
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.05)'
          }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <VisionIcon color="primary" fontSize="large" />
                    {t("ourStory.title")}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
                    {t("ourStory.description")}
                  </Typography>
                  <Chip label={t("ourStory.sinceYear")} color="primary" sx={{ fontWeight: 600 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{
                    height: 300,
                    background: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 3
                  }} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission & Values */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card sx={{ 
                height: '100%',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                background: theme.palette.mode === 'dark'
                  ? 'rgba(30, 30, 45, 0.7)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.05)'
              }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <RocketLaunch color="primary" fontSize="large" />
                    {t("mission.title")}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                    {t("mission.description")}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card sx={{ 
                height: '100%',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                background: theme.palette.mode === 'dark'
                  ? 'rgba(30, 30, 45, 0.7)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.05)'
              }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ValuesIcon color="primary" fontSize="large" />
                    {t("values.title")}
                  </Typography>
                  <List>
                    {t.raw("values.items").map((value: string, i: number) => (
                      <motion.div key={i} variants={staggerItem}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Box sx={{
                              p: 1,
                              borderRadius: '50%',
                              bgcolor: theme.palette.primary.light + '20',
                              color: theme.palette.primary.main
                            }}>
                              <AutoAwesome fontSize="small" />
                            </Box>
                          </ListItemIcon>
                          <ListItemText 
                            primary={value} 
                            primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Philosophy & Approach */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card sx={{ 
                height: '100%',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                background: theme.palette.mode === 'dark'
                  ? 'rgba(30, 30, 45, 0.7)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.05)'
              }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <InnovationIcon color="primary" fontSize="large" />
                    {t("philosophy.title")}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                    {t("philosophy.description")}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card sx={{ 
                height: '100%',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                background: theme.palette.mode === 'dark'
                  ? 'rgba(30, 30, 45, 0.7)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.05)'
              }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PartnershipIcon color="primary" fontSize="large" />
                    {t("approach.title")}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                    {t("approach.description")}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Team Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <Card sx={{ 
            mb: 6,
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            background: theme.palette.mode === 'dark'
              ? 'rgba(30, 30, 45, 0.7)'
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.05)'
          }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>
                {t("team.title")}
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <motion.div whileHover={!isMobile ? cardHover : {}}>
                    <Card sx={{ 
                      borderRadius: 3,
                      height: '100%',
                      borderColor: theme.palette.divider
                    }}>
                      <CardContent sx={{ textAlign: 'center', p: 4 }}>
                        <Avatar 
                          src="eab.jpeg" 
                          sx={{ 
                            width: 120, 
                            height: 120, 
                            mb: 3,
                            mx: 'auto',
                            border: `4px solid ${theme.palette.primary.main}`
                          }} 
                        />
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          {t("team.ceo.name")}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>
                          {t("team.ceo.position")}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <PhoneIcon color="primary" />
                          <Typography>{t("team.ceo.phone")}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }}>
                          <EmailIcon color="primary" />
                          <Typography>{t("team.ceo.email")}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <motion.div whileHover={!isMobile ? cardHover : {}}>
                    <Card sx={{ 
                      borderRadius: 3,
                      height: '100%',
                      borderColor: theme.palette.divider
                    }}>
                      <CardContent sx={{ textAlign: 'center', p: 4 }}>
                        <Avatar 
                          src="/nb.jpeg" 
                          sx={{ 
                            width: 120, 
                            height: 120, 
                            mb: 3,
                            mx: 'auto',
                            border: `4px solid ${theme.palette.primary.main}`
                          }} 
                        />
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          {t("team.deliveryLead.name")}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>
                          {t("team.deliveryLead.position")}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          <PhoneIcon color="primary" />
                          <Typography>{t("team.deliveryLead.phone")}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }}>
                          <EmailIcon color="primary" />
                          <Typography>{t("team.deliveryLead.email")}</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact CTA */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <Card sx={{ 
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: '#fff'
          }}>
            <CardContent sx={{ p: { xs: 3, md: 6 }, textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                {t("contact.title")}
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
                {t("contact.subtitle")}
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                href="/contact"
                sx={{
                  px: 6,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: theme.palette.primary.main,
                  bgcolor: '#fff',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {t("contact.button")}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutPage;