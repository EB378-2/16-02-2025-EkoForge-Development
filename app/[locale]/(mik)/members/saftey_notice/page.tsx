"use client";

import React from "react";
import { List, EditButton, ShowButton, DeleteButton, CreateButton } from "@refinedev/mui";
import { useShow, useTable, useList } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { 
  Box, 
  Stack, 
  Typography, 
  Paper,
  Chip,
  Divider,
  Tooltip,
  IconButton,
  Button
} from "@mui/material";
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Report as ReportIcon,
  Add as AddIcon
} from "@mui/icons-material";

interface Notice {
  id: string;
  title: string;
  message: string;
  time_off_incident?: string;
  submitted_by: string;
  extra_parameters?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

function ProfileName({ profileId }: { profileId: string }) {
  const { queryResult } = useShow({
    resource: "profiles",
    id: profileId,
    meta: { select: "first_name,last_name" },
    queryOptions: { enabled: !!profileId },
  });
  const profileData = queryResult?.data?.data as { first_name: string; last_name: string } | undefined;
  
  if (!profileData) return <Typography variant="body2" color="text.secondary">Loading...</Typography>;
  
  return (
    <Typography variant="body2">
      {profileData.first_name} {profileData.last_name}
    </Typography>
  );
}

function getExtraParameterKeys(rows: Notice[]): string[] {
  const keys = new Set<string>();
  rows.forEach((row) => {
    if (row.extra_parameters && typeof row.extra_parameters === "object") {
      Object.keys(row.extra_parameters).forEach((key) => keys.add(key));
    }
  });
  return Array.from(keys);
}

export default function NoticesList() {
  const {
    tableQueryResult,
    pageCount,
    current,
    setCurrent,
    pageSize,
    setPageSize,
  } = useTable<Notice>({
    resource: "notices",
    initialSorter: [{ field: "created_at", order: "desc" }],
    initialPageSize: 10,
  });

  const rows = tableQueryResult?.data?.data ?? [];
  const total = pageCount * pageSize;
  const extraKeys = getExtraParameterKeys(rows);

  const dynamicExtraColumns: GridColDef[] = extraKeys.map((key) => ({
    field: `extra_${key}`,
    headerName: key.replace(/_/g, ' ').toUpperCase(),
    width: 150,
    renderCell: (params) => {
      const extras = params.row.extra_parameters;
      if (!extras || !extras[key]) return null;
      
      const value = extras[key];
      return (
        <Chip
          label={typeof value === "object" ? JSON.stringify(value) : String(value)}
          size="small"
          color="primary"
          variant="outlined"
        />
      );
    },
  }));

  const staticColumnsPre: GridColDef[] = [
    { 
      field: "title", 
      headerName: "TITLE", 
      width: 150,
      renderCell: (params) => (
        <Typography fontWeight="medium">
          {params.value}
        </Typography>
      )
    },
    { 
      field: "message", 
      headerName: "MESSAGE", 
      width: 250,
      renderCell: (params) => (
        <Box sx={{ 
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%'
        }}>
          {params.value}
        </Box>
      )
    },
  ];

  const staticColumnsPost: GridColDef[] = [
    {
      field: "submitted_by",
      headerName: "SUBMITTED BY",
      width: 180,
      renderCell: (params) => <ProfileName profileId={params.row.submitted_by} />,
    },
    {
      field: "time_off_incident",
      headerName: "INCIDENT TIME",
      width: 180,
      renderCell: ({ value }) => value ? new Date(value).toLocaleString() : 'N/A',
    },
    {
      field: "created_at",
      headerName: "REPORTED",
      width: 180,
      renderCell: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 150,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="View details">
            <ShowButton hideText size="small" variant="outlined" resourceNameOrRouteName="notices" recordItemId={row.id} />
          </Tooltip>
          <Tooltip title="Edit">
            <EditButton hideText size="small" variant="outlined" resourceNameOrRouteName="notices" recordItemId={row.id} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteButton hideText size="small" variant="outlined" resourceNameOrRouteName="notices" recordItemId={row.id} />
          </Tooltip>
        </Stack>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  const columns: GridColDef[] = [...staticColumnsPre, ...dynamicExtraColumns, ...staticColumnsPost];

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between"
          spacing={1}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <ReportIcon color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight="bold">
              Safety Management System Reports
            </Typography>
          </Stack>
            <CreateButton>Report</CreateButton>
        </Stack>
        
        <Divider />
        
        <Typography variant="body2" color="text.secondary">
          All safety observations and reports are handled confidentially. Please report even minor observations.
        </Typography>
        
        <Box sx={{ height: 600 }}>
          <DataGrid
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
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f0f0f0',
              },
            }}
          />
        </Box>
        
        <Typography variant="caption" color="text.secondary" textAlign="right">
          Note: This does not replace official aviation safety reports. Equipment issues should be reported to the maintenance team.
        </Typography>
      </Stack>
    </Paper>
  );
}