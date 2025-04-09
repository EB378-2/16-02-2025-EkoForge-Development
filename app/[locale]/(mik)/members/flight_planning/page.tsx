"use client";

import React from "react";
import {
    EditButton,
    ShowButton,
    DeleteButton,
} from "@refinedev/mui";
import { useTable } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Link as MuiLink,
    Stack,
    CircularProgress,
    Alert,
    Divider,
    Chip,
    IconButton,
    Tooltip
} from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useTheme } from "@customHooks/useTheme";
import {
    Flight as FlightIcon,
    Description as DescriptionIcon,
    Launch as LaunchIcon,
    Info as InfoIcon,
    School as SchoolIcon,
    Forum as ForumIcon
} from "@mui/icons-material";
import DashboardCard from "@components/flightplanning/DashboardCard";
import { FlightPlan } from "@components/types";


export default function FlightPlanList() {
    const t = useTranslations("FlightPlanList");
    const theme = useTheme();
    

    const {
        tableQueryResult,
        pageCount,
        current,
        setCurrent,
        pageSize,
        setPageSize,
    } = useTable<FlightPlan>({
        resource: "flightplans",
        initialSorter: [
            {
                field: "updated_at",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "international",
                operator: "ne",
                value: true,
            },
        ],
        initialPageSize: 10,
    });

    if (tableQueryResult.isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (tableQueryResult.isError) {
        return (
            <Box sx={{ mt: 4 }}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                    {t("error.fetchFlightPlans")}
                </Alert>
            </Box>
        );
    }

    const total =
        tableQueryResult?.data?.total ??
        (pageCount ? pageCount * pageSize : 0);
    const rows = tableQueryResult?.data?.data ?? [];

    const columns: GridColDef[] = [
        { 
            field: "route", 
            headerName: t("dataGrid.route"), 
            width: 250,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color="primary"
                    variant="outlined"
                    size="small"
                />
            )
        },
        { 
            field: "notes", 
            headerName: t("dataGrid.notes"), 
            width: 200,
            renderCell: (params) => (
                <Typography variant="body2" noWrap>
                    {params.value || '-'}
                </Typography>
            )
        },
        {
            field: "actions",
            headerName: t("dataGrid.actions"),
            width: 200,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1}>
                    <Tooltip title={t("edit")}>
                        <IconButton size="small" color="primary">
                            <EditButton
                                hideText
                                size="small"
                                variant="outlined"
                                recordItemId={row.id}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t("view")}>
                        <IconButton size="small" color="info">
                            <ShowButton
                                hideText
                                size="small"
                                variant="outlined"
                                recordItemId={row.id}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t("delete")}>
                        <IconButton size="small" color="error">
                            <DeleteButton
                                hideText
                                size="small"
                                variant="outlined"
                                recordItemId={row.id}
                            />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ 
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 3
            }}>
                {t("flightPlanning")}
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard
                        title={t("aircraftReservation.title")}
                        description={t("aircraftReservation.description")}
                        link="/members/bookings"
                        buttonText={t("aircraftReservation.buttonText")}
                        theme={theme}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard
                        title={t("aviationWeather.title")}
                        description={t("aviationWeather.description")}
                        link="https://ilmailusaa.fi"
                        buttonText={t("aviationWeather.buttonText")}
                        external
                        theme={theme}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard
                        title={t("flightLogbook.title")}
                        description={t("flightLogbook.description")}
                        link="/members/logbook"
                        buttonText={t("flightLogbook.buttonText")}
                        theme={theme}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <DashboardCard
                        title={t("maintenance.title")}
                        description={t("maintenance.description")}
                        link="/members/equipment_info"
                        buttonText={t("maintenance.buttonText")}
                        theme={theme}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DashboardCard
                        title={t("flightPlan.title")}
                        description={t("flightPlan.description")}
                        link="https://www.ais.fi"
                        buttonText={t("flightPlan.buttonText")}
                        external
                        theme={theme}
                    />
                </Grid>
            </Grid>

            <Paper sx={{ 
                p: 3, 
                mb: 3,
                borderRadius: 3,
                boxShadow: theme.shadows[2]
            }}>
                <Typography variant="h5" gutterBottom sx={{
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <DescriptionIcon color="primary" />
                    {t("flightPlans")}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    rowCount={total}
                    pageSizeOptions={[5, 10, 20, 30, 50, 100]}
                    pagination
                    paginationModel={{ page: current - 1, pageSize }}
                    onPaginationModelChange={(model) => {
                        setCurrent(model.page + 1);
                        setPageSize(model.pageSize);
                    }}
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: theme.palette.mode === 'dark' ? 
                                theme.palette.grey[800] : 
                                theme.palette.grey[100],
                            borderRadius: 1
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: `1px solid ${theme.palette.divider}`,
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: theme.palette.action.hover
                        }
                    }}
                />
            </Paper>

            <Paper sx={{ 
                p: 3,
                borderRadius: 3,
                boxShadow: theme.shadows[2]
            }}>
                <Typography variant="h5" gutterBottom sx={{
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <SchoolIcon color="primary" />
                    {t("GeneralResources")}
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                    {t("GeneralResourcesDescription")}
                </Typography>
                <Stack spacing={1} mb={3}>
                    <MuiLink href="https://www.ais.fi" target="_blank" sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <LaunchIcon fontSize="small" />
                        {t("ais")}
                    </MuiLink>
                    <MuiLink href="https://ilmailusaa.fi" target="_blank" sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <LaunchIcon fontSize="small" />
                        {t("ilmailusaa")}
                    </MuiLink>
                    <MuiLink href="https://flyk.com" target="_blank" sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <LaunchIcon fontSize="small" />
                        {t("FLYK")}
                    </MuiLink>
                    <MuiLink href="https://lentopaikat.fi" target="_blank" sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <LaunchIcon fontSize="small" />
                        {t("lentopaikat")}
                    </MuiLink>
                </Stack>

                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                    {t("GeneralResourcesDescriptionTwo")}
                </Typography>
                <Box mb={3}>
                    <Typography variant="body2" gutterBottom>
                        {t("GeneralResourcesDescriptionTwoText")}
                    </Typography>
                    <Button 
                        component={Link} 
                        href="/members/instructions" 
                        variant="text" 
                        startIcon={<InfoIcon />}
                        sx={{ textTransform: 'none' }}
                    >
                        {t("instructions")}
                    </Button>
                </Box>

                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                    {t("GeneralResourcesDescriptionThree")}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {t("GeneralResourcesDescriptionThreeText")}
                </Typography>
                <Stack spacing={1} mb={3}>
                    <MuiLink href="https://groups.google.com/a/mik.fi/forum/#!forum/ihq-info" target="_blank" sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <ForumIcon fontSize="small" />
                        {t("ihqInfo")}
                    </MuiLink>
                    <MuiLink href="https://groups.google.com/a/mik.fi/forum/#!forum/stl-info" target="_blank" sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <ForumIcon fontSize="small" />
                        {t("stlInfo")}
                    </MuiLink>
                </Stack>

                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                    {t("GeneralResourcesDescriptionFour")}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {t("GeneralResourcesDescriptionFourText")}
                </Typography>
                <Button 
                    component={Link} 
                    href="/members/international_flight_planning" 
                    variant="text" 
                    startIcon={<FlightIcon />}
                    sx={{ textTransform: 'none' }}
                >
                    {t("internationalFlightPlanning")}
                </Button>
            </Paper>
        </Box>
    );
}