"use client";

import React from "react";
import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/mui";
import { useGetIdentity, useList } from "@refinedev/core";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { ProfileName, ResourceName } from "@/components/functions/FetchFunctions";
import { formatHHmm } from "@/components/functions/FormatFunctions";
import { Logbook } from "@/components/types";

export default function LogbookList() {
  const { data: identityData } = useGetIdentity<{ id: string }>();
  const currentUserId = identityData?.id;
  const {
    data: listData,
    isLoading,
    isError,
  } = useList<Logbook>({
    resource: "logbook",
    filters: [{ field: "profile_id", operator: "eq", value: currentUserId }],
    sorters: [
      { field: "id", order: "asc" } // Corrected sorter syntax
    ],
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const rows = listData?.data ?? [];
  const total = listData?.total ?? 0;
  const current = listData?.pagination?.current || 1;
  const pageSize = listData?.pagination?.pageSize || 10;
  const pageCount = Math.ceil(total / pageSize);

  // Build a set of all keys in flight_details objects from rows.
  const flightDetailKeys = new Set<string>();
  rows.forEach((row) => {
    if (row.flight_details && typeof row.flight_details === "object") {
      Object.keys(row.flight_details).forEach((key) => flightDetailKeys.add(key));
    }
  });
  
  const flightDetailColumns: GridColDef[] = Array.from(flightDetailKeys).map((key) => ({
    field: `flight_details_${key}`,
    headerName: key.toUpperCase(),
    width: 150,
    renderCell: (params: GridRenderCellParams<Logbook>) => {
      return params.row.flight_details ? params.row.flight_details[key] : "";
    },
  }));

  // Static columns
  const staticColumns: GridColDef<Logbook>[] = [
    {
      field: "profile_name",
      headerName: "Billed Person",
      width: 150,
      renderCell: (params: GridRenderCellParams<Logbook>) => (
        <ProfileName profileId={params.row.profile_id} />
      ),
    },
    {
      field: "resource_id",
      headerName: "Resource",
      width: 150,
      renderCell: (params: GridRenderCellParams<Logbook>) => (
        <ResourceName id={String(params.row.resource_id)} />
      ),
    },
    { field: "flight_date", headerName: "Flight Date", width: 150 },
    { 
      field: "flight_time", 
      headerName: "Flight Time", 
      width: 120, 
      renderCell: (params: GridRenderCellParams<Logbook>) => formatHHmm(params.row.flight_time) 
    },
    { 
      field: "block_time", 
      headerName: "Block Time", 
      width: 150, 
      renderCell: (params: GridRenderCellParams<Logbook>) => formatHHmm(params.row.block_time) 
    },
    { field: "block_off_time", headerName: "Block Off Time", width: 150 },
    { field: "takeoff_time", headerName: "Takeoff Time", width: 150 },
    { field: "landing_time", headerName: "Landing Time", width: 150 },
    { field: "block_on_time", headerName: "Block On Time", width: 150 },
    { field: "landings", headerName: "Landings", width: 100 },
    { field: "fuel_left", headerName: "Fuel Left", width: 120 },
    { field: "billing_info", headerName: "Billing Info", flex: 1 },
    { field: "pax", headerName: "PAX", width: 100 },
    { field: "departure_place", headerName: "Departure Place", width: 150 },
    { field: "arrival_place", headerName: "Arrival Place", width: 150 },
    { field: "flight_type", headerName: "Flight Type", width: 150 },
    {
      field: "pic_id",
      headerName: "PIC",
      width: 150,
      renderCell: (params: GridRenderCellParams<Logbook>) => (
        <ProfileName profileId={params.row.pic_id || ""} />
      ),
    },
    {
      field: "student_id",
      headerName: "Student",
      width: 150,
      renderCell: (params: GridRenderCellParams<Logbook>) =>
        params.row.student_id ? (
          <ProfileName profileId={params.row.student_id} />
        ) : (
          <span>N/A</span>
        ),
    },
    { field: "notes", headerName: "Notes", flex: 1 },
    {
      field: "created_at",
      headerName: "Created At",
      width: 180,
      renderCell: (params: GridRenderCellParams<Logbook>) => 
        params.value ? new Date(params.value).toLocaleString() : "",
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 180,
      renderCell: (params: GridRenderCellParams<Logbook>) => 
        params.value ? new Date(params.value).toLocaleString() : "",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: GridRenderCellParams<Logbook>) => (
        <Stack direction="row" spacing={1}>
          <EditButton 
            hideText 
            size="small" 
            variant="outlined" 
            resource="logbook" 
            recordItemId={params.row.id} 
          />
          <ShowButton 
            hideText 
            size="small" 
            variant="outlined" 
            resource="logbook" 
            recordItemId={params.row.id} 
          />
          <DeleteButton 
            hideText 
            size="small" 
            variant="outlined" 
            resource="logbook" 
            recordItemId={params.row.id} 
          />
        </Stack>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  // Combine static columns and flight details dynamic columns.
  const columns: GridColDef<Logbook>[] = [...staticColumns, ...flightDetailColumns];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const handlePaginationChange = (model: { page: number; pageSize: number }) => {
    // You would typically update your query here
    // For server-side pagination, you would need to refetch with new pagination params
    console.log("Pagination changed:", model);
  };

  return (
    <List title="Logbook Entries">
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        rowCount={total}
        pageSizeOptions={[10, 20, 30, 50, 100]}
        paginationMode="server"
        paginationModel={{ page: current - 1, pageSize }}
        onPaginationModelChange={handlePaginationChange}
        loading={isLoading}
      />
    </List>
  );
}