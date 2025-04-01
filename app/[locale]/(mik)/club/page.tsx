"use client";

import React from "react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { Box, Container, Typography, Button } from "@mui/material";
import { useColorMode } from "@contexts/color-mode";
import { getTheme } from "@theme/theme";

const FlightClubPage: React.FC = () => {
  const t = useTranslations("FlightClub");
  const { mode } = useColorMode();
  const theme = getTheme(mode);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
        {t("title")}
      </Typography>

      <Box component={motion.div} initial="hidden" whileInView="visible" variants={fadeInUp}>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
          {t("intro")}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4, mb: 2 }}>
          {t("activitiesTitle")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
          {t("activitiesText")}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4, mb: 2 }}>
          {t("aboutUsTitle")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
          {t("aboutUsText")}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 4, mb: 2 }}>
          {t("joinUsTitle")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6 }}>
          {t("joinUsText")}
        </Typography>

        <NextLink href="https://malminilmailukerho.fi" passHref>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                color: theme.palette.common.white,
                fontWeight: "bold",
                borderRadius: 50,
                boxShadow: 3,
                textTransform: "none",
              }}
            >
              {t("joinNow")}
            </Button>
          </motion.div>
        </NextLink>
      </Box>
    </Container>
  );
};

export default FlightClubPage;
