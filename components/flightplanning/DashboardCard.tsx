"use client";

import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import Link from "next/link";
import FlightIcon from '@mui/icons-material/Flight';
import PublicIcon from '@mui/icons-material/Public';
import BookIcon from '@mui/icons-material/Book';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import LaunchIcon from '@mui/icons-material/Launch';
import { getTheme } from "@theme/theme";

interface DashboardCardProps {
    title: string;
    description: string;
    link: string;
    buttonText: string;
    external?: boolean;
    theme: ReturnType<typeof getTheme>;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    description,
    link,
    buttonText,
    external = false,
    theme,
}) => {
    const iconMap: Record<string, JSX.Element> = {
        "aircraftReservation": <FlightIcon color="primary" />,
        "aviationWeather": <PublicIcon color="primary" />,
        "flightLogbook": <BookIcon color="primary" />,
        "maintenance": <BuildIcon color="primary" />,
        "flightPlan": <DescriptionIcon color="primary" />
    };

    const icon = iconMap[title.split('.')[0]] || <InfoIcon color="primary" />;

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[6]
                }
            }}
            elevation={3}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                    {icon}
                    <Typography variant="h6" fontWeight={600}>
                        {title}
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    {description}
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    href={link}
                    size="small"
                    endIcon={external ? <LaunchIcon fontSize="small" /> : null}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: 'none',
                            backgroundColor: theme.palette.primary.dark
                        }
                    }}
                    fullWidth
                >
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;