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
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  ToggleButtonGroup,
  ToggleButton,  
  Divider,
  useMediaQuery,
  Theme,
  Fade,
} from "@mui/material";
import {
  Check as CheckIcon,
  Star as StarIcon,
  HelpOutline as HelpIcon,
  Bolt as BoltIcon,
  WorkspacePremium as PremiumIcon,
  Diamond as DiamondIcon,
} from "@mui/icons-material";
import { useTheme } from "@customHooks/useTheme";

const PricingPage: React.FC = () => {
  const t = useTranslations("Pricing");
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Luxury animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1]
      } 
    },
  };

  const cardHover = {
    y: -10,
    boxShadow: `0 25px 50px -12px ${theme.palette.primary.light}40`,
    transition: { 
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    },
  };

  const glowEffect = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Pricing plans data with i18n
  const pricingPlans = [
    {
      id: 1,
      name: t("plans.core.name"),
      icon: <DiamondIcon fontSize="large" />,
      description: t("plans.core.description"),
      monthlyPrice: t("plans.core.monthlyPrice"),
      annualPrice: t("plans.core.annualPrice"),
      savings: t("plans.core.savings"),
      features: [
        t("plans.core.features.0"),
        t("plans.core.features.1"),
        t("plans.core.features.2"),
        t("plans.core.features.3"),
        t("plans.core.features.4"),
        t("plans.core.features.5"),
        t("plans.core.features.6"),
      ],
      cta: t("plans.core.cta"),
      link: "/membership",
      popular: false,
    },
    {
      id: 2,
      name: t("plans.lite.name"),
      icon: <BoltIcon fontSize="large" />,
      description: t("plans.lite.description"),
      monthlyPrice: t("plans.lite.monthlyPrice"),
      annualPrice: t("plans.lite.annualPrice"),
      savings: t("plans.lite.savings"),
      features: [
        t("plans.lite.features.0"),
        t("plans.lite.features.1"),
        t("plans.lite.features.2"),
        t("plans.lite.features.3"),
        t("plans.lite.features.4"),
      ],
      cta: t("plans.lite.cta"),
      link: "/contact",
      popular: true,
    },
    {
      id: 3,
      name: t("plans.free.name"),
      icon: <StarIcon fontSize="large" />,
      description: t("plans.free.description"),
      monthlyPrice: t("plans.free.monthlyPrice"),
      annualPrice: t("plans.free.annualPrice"),
      features: [
        t("plans.free.features.0"),
        t("plans.free.features.1"),
        t("plans.free.features.2"),
        t("plans.free.features.3"),
      ],
      cta: t("plans.free.cta"),
      link: "/signup",
      popular: false,
    },
  ];

  const handleBillingChange = (
    event: React.MouseEvent<HTMLElement>,
    newBilling: "monthly" | "annual"
  ) => {
    if (newBilling !== null) {
      setBillingCycle(newBilling);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 10,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '500px',
        zIndex: 0,
      }
    }}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Floating decorative elements */}
        <Fade in timeout={2000}>
          <Box sx={{
            position: 'absolute',
            top: 100,
            right: 100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
            zIndex: 0,
            display: { xs: 'none', lg: 'block' }
          }} />
        </Fade>

        {/* Page Header */}
        <Box sx={{ textAlign: "center", mb: 8, position: 'relative' }}>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '4rem' },
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '20%',
                  width: '60%',
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  borderRadius: '2px'
                }
              }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: 400,
              }}
            >
              {t("subtitle")}
            </Typography>
          </motion.div>
        </Box>

        {/* Billing Toggle */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          mb: 8,
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card sx={{
              p: 1,
              borderRadius: '50px',
              background: theme.palette.mode === 'dark'
                ? 'rgba(30, 30, 45, 0.7)'
                : 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <ToggleButtonGroup
                value={billingCycle}
                exclusive
                onChange={handleBillingChange}
                aria-label={t("billingToggle.ariaLabel")}
                sx={{
                  bgcolor: 'transparent',
                  p: 0.5,
                }}
              >
                <ToggleButton
                  value="monthly"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    letterSpacing: '0.5px',
                    color: billingCycle === 'monthly' ? '#fff' : 'text.primary',
                    bgcolor: billingCycle === 'monthly' ? 'primary.main' : 'transparent',
                    '&:hover': {
                      bgcolor: billingCycle === 'monthly' ? 'primary.dark' : 'action.hover',
                    }
                  }}
                >
                  {t("billingToggle.monthly")}
                </ToggleButton>
                <ToggleButton
                  value="annual"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    letterSpacing: '0.5px',
                    color: billingCycle === 'annual' ? '#fff' : 'text.primary',
                    bgcolor: billingCycle === 'annual' ? 'primary.main' : 'transparent',
                    '&:hover': {
                      bgcolor: billingCycle === 'annual' ? 'primary.dark' : 'action.hover',
                    }
                  }}
                >
                  {t("billingToggle.annual")}
                  <Chip 
                    label={t("billingToggle.savings")} 
                    size="small" 
                    sx={{ 
                      ml: 1,
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: billingCycle === 'annual' ? '#fff' : 'text.secondary',
                      fontSize: '0.7rem',
                      height: '20px'
                    }} 
                  />
                </ToggleButton>
              </ToggleButtonGroup>
            </Card>
          </motion.div>
        </Box>

        {/* Pricing Columns */}
        <Grid container spacing={4} justifyContent="center" sx={{ position: 'relative', zIndex: 1 }}>
          {pricingPlans.map((plan) => (
            <Grid 
              item 
              xs={12} 
              md={6} 
              lg={4} 
              key={plan.id}
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                whileHover={!isMobile ? cardHover : {}}
                onHoverStart={() => setHoveredCard(plan.id)}
                onHoverEnd={() => setHoveredCard(null)}
                style={{ width: '100%' }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    height: '100%',
                    border: plan.popular
                      ? `2px solid ${theme.palette.primary.main}`
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(30, 30, 45, 0.7)'
                      : 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(12px)',
                    overflow: 'visible',
                    position: 'relative',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    maxWidth: 420,
                    mx: 'auto',
                    '&::before': plan.popular ? {
                      content: '""',
                      position: 'absolute',
                      top: -2,
                      left: -2,
                      right: -2,
                      bottom: -2,
                      borderRadius: 4,
                      zIndex: -1,
                      opacity: 0.7,
                      filter: 'blur(10px)'
                    } : {}
                  }}
                >
                  {plan.popular && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2
                      }}
                    >
                      <motion.div
                        variants={glowEffect}
                        initial="initial"
                        animate={hoveredCard === plan.id ? "hover" : "initial"}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -10,
                            left: -10,
                            right: -10,
                            bottom: -10,
                            borderRadius: '50px',
                            background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)`,
                            filter: 'blur(10px)',
                            opacity: 0.5
                          }}
                        />
                      </motion.div>
                      <Chip
                        label={t("mostPopular")}
                        color="primary"
                        size="medium"
                        icon={<StarIcon fontSize="small" />}
                        sx={{
                          fontWeight: 700,
                          px: 2,
                          py: 1,
                          boxShadow: `0 4px 10px ${theme.palette.primary.light}`,
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontSize: '0.7rem'
                        }}
                      />
                    </Box>
                  )}

                  <CardContent sx={{ 
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Box sx={{ 
                      textAlign: 'center', 
                      mb: 4,
                      mt: plan.popular ? 2 : 0
                    }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2.5,
                          mb: 3,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                          color: '#fff',
                          
                          fontSize: '2rem'
                        }}
                      >
                        {plan.icon}
                      </Box>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 800, 
                          mb: 1.5,
                          letterSpacing: '-0.5px'
                        }}
                      >
                        {plan.name}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.6,
                          fontSize: '1.05rem'
                        }}
                      >
                        {plan.description}
                      </Typography>
                    </Box>

                    <Box sx={{ 
                      textAlign: 'center', 
                      mb: 4,
                      position: 'relative'
                    }}>
                      <Typography 
                        variant="h2" 
                        sx={{ 
                          fontWeight: 800,
                          lineHeight: 1,
                          mb: 1,
                          fontSize: { xs: '3rem', sm: '3.5rem' }
                        }}
                      >
                        {billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                        <Typography
                          component="span"
                          variant="h5"
                          color="text.secondary"
                          sx={{ 
                            fontWeight: 500,
                            ml: 0.5
                          }}
                        >
                          {t("perMonth")}
                        </Typography>
                      </Typography>
                      {billingCycle === "annual" && plan.savings && (
                        <Typography 
                          variant="subtitle2" 
                          color="success.main"
                          sx={{
                            fontWeight: 600,
                            display: 'inline-block',
                            px: 2,
                            py: 0.5,
                            borderRadius: '50px',
                            bgcolor: theme.palette.mode === 'dark' 
                              ? 'rgba(74, 222, 128, 0.1)' 
                              : 'rgba(74, 222, 128, 0.2)'
                          }}
                        >
                          {plan.savings}
                        </Typography>
                      )}
                    </Box>

                    <Divider sx={{ 
                      my: 2,
                      bgcolor: theme.palette.mode === 'dark' 
                        ? 'rgba(255,255,255,0.1)' 
                        : 'rgba(0,0,0,0.05)'
                    }} />

                    <List 
                      disablePadding
                      sx={{ 
                        mb: 3,
                        flex: 1
                      }}
                    >
                      {plan.features.map((feature, index) => (
                        <ListItem 
                          key={index} 
                          sx={{ 
                            px: 0, 
                            py: 1,
                            alignItems: 'flex-start'
                          }}
                        >
                          <ListItemIcon sx={{ 
                            minWidth: 32,
                            mt: '4px'
                          }}>
                            <CheckIcon
                              color="primary"
                              sx={{
                                bgcolor: theme.palette.primary.light,
                                p: 0.5,
                                borderRadius: '50%',
                                fontSize: '1rem'
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{
                              variant: "body1",
                              fontWeight: 500,
                              color: 'text.primary',
                              sx: {
                                lineHeight: 1.5
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                      <Button
                        variant={plan.popular ? "contained" : "outlined"}
                        size="large"
                        href={plan.link}
                        fullWidth
                        sx={{
                          py: 2,
                          borderRadius: '50px',
                          fontWeight: 700,
                          fontSize: '1rem',
                          letterSpacing: '0.5px',
                          boxShadow: plan.popular
                            ? `0 4px 20px ${theme.palette.primary.light}`
                            : 'none',
                          '&:hover': {
                            boxShadow: `0 8px 25px ${theme.palette.primary.light}`,
                            transform: 'translateY(-2px)'
                          },
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                            transform: 'translateX(-100%)',
                            transition: 'transform 0.6s ease'
                          },
                          '&:hover::after': {
                            transform: 'translateX(100%)'
                          }
                        }}
                      >
                        {plan.cta}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Box sx={{ 
          mt: 15,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -100,
            left: 0,
            right: 0,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`
          }
        }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center', 
                mb: 6,
                fontWeight: 800,
                letterSpacing: '-0.5px'
              }}
            >
              {t("faqTitle")}
            </Typography>
            <Grid 
              container 
              spacing={4}
              justifyContent="center"
            >
              {[0, 1, 2, 3].map((index) => (
                <Grid 
                  item 
                  xs={12} 
                  md={6} 
                  key={index}
                  sx={{
                    maxWidth: 600
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        bgcolor: theme.palette.mode === 'dark'
                          ? 'rgba(30, 30, 45, 0.5)'
                          : 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.1)'
                          : 'rgba(0,0,0,0.05)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 700,
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <HelpIcon 
                            color="primary" 
                            sx={{ 
                              mr: 2,
                              fontSize: '1.5rem'
                            }} 
                          />
                          {t(`faq.${index}.question`)}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.7,
                            pl: 5
                          }}
                        >
                          {t(`faq.${index}.answer`)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingPage;