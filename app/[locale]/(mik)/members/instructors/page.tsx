"use client";

import React from "react";
import { List, ShowButton } from "@refinedev/mui";
import { useTable } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack, Chip, Tooltip, Typography, Box, Paper, Divider } from "@mui/material";
import { ProfileName, ProfilePhone } from "@/components/functions/FetchFunctions";
import { useTranslations } from "next-intl";
import { useTheme } from "@customHooks/useTheme";
import { Instructor } from "@/components/types";

const maxPricing = {
    flightUnlicensed: "100 €/block (unlicensed student)",
    flightLicensed: "90 €/block (licensed student)",
    theory: "75 €/hour (divided among participants)"
};

const trainingManagerInfo = {
    name: "Rami Sadik",
    aircraft: "OH-SRH, OH-IHQ (no NF), OH-STL",
    updated: "Updated 28.10.2020",
    license: "Training license valid indefinitely"
};

export default function InstructorsList() {
    const t = useTranslations("instructors");
    const theme = useTheme();
    
    const {
        tableQueryResult,
        pageCount,
        current,
        setCurrent,
        pageSize,
        setPageSize,
    } = useTable<Instructor>({
        resource: "instructors",
        initialSorter: [
            {
                field: "id",
                order: "asc",
            },
        ],
        initialPageSize: 10,
    });

    const rows = tableQueryResult?.data?.data ?? [];
    const total = pageCount * pageSize;

    const renderPricingTooltip = () => (
        <Box sx={{ p: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
                {t("pricingInfo.flightInstruction")}
            </Typography>
            <Typography variant="body2" gutterBottom>
                • {maxPricing.flightUnlicensed}<br />
                • {maxPricing.flightLicensed}
            </Typography>
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
                {t("pricingInfo.theoryInstruction")}
            </Typography>
            <Typography variant="body2">
                • {maxPricing.theory}
            </Typography>
        </Box>
    );

    const columns: GridColDef[] = [
        {
            field: "profile_name",
            headerName: `${t("columns.name")}`,
            width: 180,
            renderCell: (params) => (
                <ProfileName profileId={params.row.profile_id} />
            ),
        },
        {
            field: "phone",
            headerName: `${t("columns.phone")}`,
            width: 150,
            renderCell: (params) => (
                <ProfilePhone profileId={params.row.profile_id} />
            ),
        },
        { 
            field: "rating_level", 
            headerName: `${t("columns.rating")}`, 
            width: 150 
        },
        {
            field: "PPL_LAPL",
            headerName: `${t("columns.pplLapl")}`,
            width: 120,
            renderCell: (params) => (
                <Stack direction="row" spacing={0.5}>
                    {params.row.availability?.PPL && (
                        <Chip 
                            label="PPL" 
                            size="small" 
                            sx={{ 
                                backgroundColor: theme.palette.primary.light,
                                color: theme.palette.primary.contrastText
                            }} 
                        />
                    )}
                    {params.row.availability?.LAPL && (
                        <Chip 
                            label="LAPL" 
                            size="small" 
                            sx={{ 
                                backgroundColor: theme.palette.secondary.light,
                                color: theme.palette.secondary.contrastText
                            }} 
                        />
                    )}
                </Stack>
            ),
        },
        {
            field: "NF",
            headerName: `${t("columns.nightFlight")}`,
            width: 80,
            renderCell: (params) => (
                params.row.availability?.NF && (
                    <Chip 
                        label="NF" 
                        size="small" 
                        sx={{ 
                            backgroundColor: theme.palette.success.light,
                            color: theme.palette.success.contrastText
                        }} 
                    />
                )
            ),
        },
        {
            field: "IR",
            headerName: `${t("columns.instrumentRating")}`,
            width: 80,
            renderCell: (params) => (
                params.row.availability?.IR && (
                    <Chip 
                        label="IR" 
                        size="small" 
                        sx={{ 
                            backgroundColor: theme.palette.info.light,
                            color: theme.palette.info.contrastText
                        }} 
                    />
                )
            ),
        },
        {
            field: "Kertaus",
            headerName: `${t("columns.recurrentTraining")}`,
            width: 100,
            renderCell: (params) => (
                params.row.availability?.Kertauskoulutus && (
                    <Chip 
                        label="Recurrent" 
                        size="small" 
                        variant="outlined"
                    />
                )
            ),
        },
        {
            field: "Veloitus",
            headerName: `${t("columns.pricing")}`,
            width: 150,
            renderCell: (params) => (
                params.row.availability?.Veloitus ? (
                    <Tooltip title={params.row.availability.Veloitus}>
                        <Chip 
                            label={params.row.availability.Veloitus} 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                                borderColor: theme.palette.warning.main,
                                color: theme.palette.warning.dark
                            }}
                        />
                    </Tooltip>
                ) : null
            ),
        },
        {
            field: "max_pricing",
            headerName: `${t("columns.maxPricing")}`,
            width: 180,
            renderCell: () => (
                <Tooltip title={renderPricingTooltip()} arrow>
                    <Chip 
                        label="Max Pricing" 
                        size="small" 
                        variant="outlined"
                        sx={{ 
                            borderColor: theme.palette.grey[400],
                            color: theme.palette.text.secondary
                        }}
                    />
                </Tooltip>
            ),
        },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            {/* Header Section */}
            <Paper elevation={0} sx={{ 
                p: 3, 
                mb: 3,
                backgroundColor: theme.palette.primary.dark,
                color: theme.palette.primary.contrastText,
                borderRadius: '8px 8px 0 0'
            }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Flight Instructor Pricing Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    Instructor fees are maximum:
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <li><Typography variant="body1">{maxPricing.flightUnlicensed}</Typography></li>
                    <li><Typography variant="body1">{maxPricing.flightLicensed}</Typography></li>
                    <li><Typography variant="body1">{maxPricing.theory}</Typography></li>
                </Box>
                <Typography variant="body2" fontStyle="italic">
                    * If an instructor has announced a lower fee than the maximum price, it is shown in the table below
                </Typography>
            </Paper>

            {/* Main Data Grid */}
            <List title={t("title")}>
                <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    rowCount={total}
                    pageSizeOptions={[10, 20, 30, 50, 100]}
                    pagination
                    paginationModel={{ page: current - 1, pageSize }}
                    onPaginationModelChange={(model) => {
                        setCurrent(model.page + 1);
                        setPageSize(model.pageSize);
                    }}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            py: 1,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: theme.palette.grey[100],
                        },
                        mb: 3
                    }}
                />
            </List>

            {/* Footer Section */}
            <Paper elevation={0} sx={{ 
                p: 3,
                borderRadius: '0 0 8px 8px'
            }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Training Manager
                </Typography>
                <Typography variant="body1" paragraph>
                    {trainingManagerInfo.name}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Aircraft listed in training license (PPL(A), LAPL(A), NF):
                </Typography>
                <Typography variant="body1" paragraph>
                    {trainingManagerInfo.aircraft}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        {trainingManagerInfo.updated}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {trainingManagerInfo.license}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}