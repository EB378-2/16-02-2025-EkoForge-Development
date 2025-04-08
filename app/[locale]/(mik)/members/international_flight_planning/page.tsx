"use client";

import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert, 
  Grid,
  Chip,
  Stack,
  Button,
  IconButton,
  Card,
  CardContent,
  Tooltip
} from "@mui/material";
import { EditButton, ShowButton, DeleteButton } from "@refinedev/mui";
import { useTable } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTranslations } from "next-intl";
import { useTheme } from "@components/functions/useTheme";
import Image from "next/image";
import {
  Flight as FlightIcon,
  Description as DescriptionIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { SectionProps } from "@/components/types";


const Section: React.FC<SectionProps> = ({ 
  title, 
  content, 
  linkText, 
  linkUrl,
  imageSrc,
  imageAlt
}) => {
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={imageSrc ? 8 : 12}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <FlightIcon color="primary" />
              <Typography variant="h6" fontWeight={600}>
                {title}
              </Typography>
            </Stack>
            <Typography 
              variant="body1" 
              sx={{ 
                whiteSpace: "pre-line",
                color: 'text.secondary'
              }}
            >
              {content}
            </Typography>
            {linkText && linkUrl && (
              <Box sx={{ mt: 2 }}>
                <Button
                  href={linkUrl}
                  target="_blank"
                  variant="outlined"
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2
                  }}
                >
                  {linkText}
                </Button>
              </Box>
            )}
          </Grid>
          {imageSrc && (
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  position: 'relative',
                  height: 400,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3
                }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default function InternationalFlightPlanningPage() {
  const t = useTranslations("InternationalFlightPlanning");
  const theme = useTheme();

  const {
    tableQueryResult: tableQueryResultIntl,
    pageCount: pageCountIntl,
    current: currentIntl,
    setCurrent: setCurrentIntl,
    pageSize: pageSizeIntl,
    setPageSize: setPageSizeIntl,
  } = useTable({
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
        operator: "eq",
        value: true,
      },
    ],
    initialPageSize: 10,
  });

  const totalIntl =
    tableQueryResultIntl?.data?.total ??
    (pageCountIntl ? pageCountIntl * pageSizeIntl : 0);
  const rowsIntl = tableQueryResultIntl?.data?.data ?? [];

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
    <Box sx={{ 
      p: { xs: 2, md: 3 }, 
      maxWidth: { md: 1200 }, 
      mx: "auto" 
    }}>
      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          color: 'primary.main',
          mb: 4
        }}
      >
        {t("title")}
      </Typography>

      {/* Section 1 with image */}
      <Section
        title={t("section1.title")}
        content={t("section1.content")}
        imageSrc="/europe-ranget.jpg"
        imageAlt={t("section1.title")}
      />

      {/* International Flight Plans Table */}
      <Card
        sx={{
          my: 4,
          borderRadius: 3,
          boxShadow: 3
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={3}>
            <DescriptionIcon color="primary" />
            <Typography variant="h5" fontWeight={600}>
              {t("internationalFlightPlans")}
            </Typography>
          </Stack>
          
          {tableQueryResultIntl.isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress />
            </Box>
          ) : tableQueryResultIntl.isError ? (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {t("error.fetchInternationalFlightPlans")}
            </Alert>
          ) : (
            <Box sx={{ height: 500 }}>
              <DataGrid
                rows={rowsIntl}
                columns={columns}
                rowCount={totalIntl}
                pageSizeOptions={[5, 10, 20, 30, 50, 100]}
                pagination
                paginationModel={{ 
                  page: currentIntl - 1, 
                  pageSize: pageSizeIntl 
                }}
                onPaginationModelChange={(model) => {
                  setCurrentIntl(model.page + 1);
                  setPageSizeIntl(model.pageSize);
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
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Remaining sections */}
      <Section
        title={t("section2.title")}
        content={t("section2.content")}
        linkText={t("section2.linkText")}
        linkUrl={t("section2.linkUrl")}
      />

      <Section
        title={t("section3.title")}
        content={t("section3.content")}
        linkText={t("section3.linkText")}
        linkUrl={t("section3.linkUrl")}
      />

      <Section
        title={t("section4.title")}
        content={t("section4.content")}
        linkText={t("section4.linkText")}
        linkUrl={t("section4.linkUrl")}
      />

      <Section
        title={t("section5.title")}
        content={t("section5.content")}
        linkText={t("section5.linkText")}
        linkUrl={t("section5.linkUrl")}
      />

      <Section
        title={t("section6.title")}
        content={t("section6.content")}
        linkText={t("section6.linkText")}
        linkUrl={t("section6.linkUrl")}
      />

      <Section
        title={t("section7.title")}
        content={t("section7.content")}
        linkText={t("section7.linkText")}
        linkUrl={t("section7.linkUrl")}
      />

      <Section
        title={t("section8.title")}
        content={t("section8.content")}
        linkText={t("section8.linkText")}
        linkUrl={t("section8.linkUrl")}
      />
    </Box>
  );
}