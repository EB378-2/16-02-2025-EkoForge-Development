"use client";

import React from "react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { Box, Container, Typography, Button, Grid, useTheme, Divider } from "@mui/material";
import { useColorMode } from "@contexts/color-mode";
import { getTheme } from "@theme/theme";
import Image from "next/image";

const AviationHomePage: React.FC = () => {
  const t = useTranslations("AviationHome");
  const { mode } = useColorMode();
  const theme = getTheme(mode);
  const muiTheme = useTheme();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 3, transition: { duration: 1 } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 3, transition: { duration: 1 } },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Box sx={{ overflowX: "hidden", m: 0, p: 0 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.palette.primary.light,
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Image
          src="/feel-efhf2.jpg"
          alt="Aviation hero"
          fill
          style={{
            objectFit: "cover",
            filter: "brightness(0.65)",
            opacity: 0.75,
          }}
          priority
        />

        {/* Hero Content */}
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  zIndex: 1000,
                  fontWeight: 900,
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  mb: 3,
                  
                  textShadow: `2px 2px 8px ${theme.palette.strong.default}`,
                }}
              >
                {t("heroTitle")}
              </Typography>
            </motion.div>
          </motion.div>
        </Container>
      </Box>
      <Box
        sx={{
          position: "relative",
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <motion.div variants={fadeInUp}>
          <Typography
            variant="h5"
            component="p"
            sx={{
              maxWidth: 800,
              mx: "auto",
              mb: 4,
              zIndex: 1000,
              textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            {t("heroSubtitle")}
          </Typography>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <NextLink href="/signup" passHref>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: "white",
                fontWeight: "bold",
                borderRadius: 50,
                boxShadow: 6,
                zindex: 1000,
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: 8,
                },
                transition: "all 0.3s ease",
              }}
            >
              {t("bookFlight")}
            </Button>
          </NextLink>
        </motion.div>
      </Box>  


      {/* About Section */}
      <Box sx={{ py: 10, bgcolor: muiTheme.palette.background.default }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInRight}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 400,
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: 6,
                  }}
                >
                  <Image
                    src="/ihq.jpeg"
                    alt="MIK Aviation"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    color: muiTheme.palette.text.primary,
                  }}
                >
                  {t("aboutTitle")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, lineHeight: 1.8, fontSize: "1.1rem" }}
                >
                  {t("aboutText1")}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 3, lineHeight: 1.8, fontSize: "1.1rem" }}
                >
                  {t("aboutText2")}
                </Typography>
                <NextLink href="/club" passHref>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1,
                      fontWeight: "bold",
                      borderRadius: 50,
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                      },
                    }}
                  >
                    {t("learnMore")}
                  </Button>
                </NextLink>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 10, bgcolor: muiTheme.palette.background.paper }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 2,
                textAlign: "center",
                color: muiTheme.palette.text.primary,
              }}
            >
              {t("servicesTitle")}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 6,
                textAlign: "center",
                maxWidth: 700,
                mx: "auto",
                color: muiTheme.palette.text.secondary,
              }}
            >
              {t("servicesSubtitle")}
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      bgcolor: muiTheme.palette.background.default,
                      borderRadius: 4,
                      boxShadow: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: theme.palette.primary.main,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                      }}
                    >
                      <Typography variant="h5" sx={{ color: "white" }}>
                        {item}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", mb: 2 }}
                    >
                      {t(`serviceTitle${item}`)}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: muiTheme.palette.text.secondary }}
                    >
                      {t(`serviceText${item}`)}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 10, bgcolor: muiTheme.palette.background.default }}>
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 6,
                textAlign: "center",
              }}
            >
              {t("testimonialsTitle")}
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {[1, 2].map((item) => (
              <Grid item xs={12} md={6} key={item}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={item % 2 === 0 ? slideInRight : fadeInUp}
                >
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      bgcolor: muiTheme.palette.background.paper,
                      borderRadius: 4,
                      boxShadow: 1,
                      position: "relative",
                      "&:before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        bgcolor: theme.palette.primary.main,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontStyle: "italic", mb: 3, fontSize: "1.1rem" }}
                    >
                      &quot;{t(`testimonialText${item}`)}&quot;
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          bgcolor: theme.palette.grey[300],
                          mr: 2,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src="/feel-efhf2.jpg"
                          alt="Client"
                          width={50}
                          height={50}
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                          {t(`testimonialAuthor${item}`)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {t(`testimonialRole${item}`)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 10, position: "relative", overflow: "hidden", color: theme.palette.secondary.contrastText, }}>
        <Image
          src="/feel-efhf2.jpg"
          alt="Aviation background"
          fill
          style={{
            objectFit: "cover",
            zIndex: 0,
            filter: "brightness(0.4)",
          }}
        />
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Box sx={{ textAlign: "center", color: "white" }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                {t("ctaTitle")}
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 4, maxWidth: 700, mx: "auto" }}
              >
                {t("ctaSubtitle")}<br/>
                {t("ctaText")}
              </Typography>
              <NextLink href="/signup" passHref>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: "1.1rem",
                    background: "white",
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                    borderRadius: 50,
                    "&:hover": {
                      background: "white",
                      transform: "translateY(-3px)",
                      boxShadow: 6,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {t("bookNow")}
                </Button>
              </NextLink>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default AviationHomePage;