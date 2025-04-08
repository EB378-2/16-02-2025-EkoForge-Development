"use client";

import React from "react";
import { List, EditButton, ShowButton, DeleteButton } from "@refinedev/mui";
import { useTable } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { ProfileName, ResourceName } from "@/components/functions/FetchFunctions";
import { formatHHmm } from "@/components/functions/FormatFunctions";
import { Logbook } from "@/components/types";

export default function LogbookList() {
  const {
    tableQueryResult,
    pageCount,
    current,
    setCurrent,
    pageSize,
    setPageSize,
  } = useTable<Logbook>({
    resource: "logbook",
    initialSorter: [{ field: "id", order: "asc" }],
    initialPageSize: 10,
  });
  

  const rows = tableQueryResult?.data?.data ?? [];
  const total = pageCount * pageSize;

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
    renderCell: (params) => {
      return params.row.flight_details ? params.row.flight_details[key] : "";
    },
  }));

  // Static columns
  const staticColumns: GridColDef[] = [
    {
      field: "profile_name",
      headerName: "Billed Person",
      width: 150,
      renderCell: (params) => <ProfileName profileId={params.row.profile_id} />,
    },
    {
      field: "resource_id",
      headerName: "Resource",
      width: 150,
      renderCell: (params) => <ResourceName id={String(params.row.resource_id)} />,
    },
    { field: "flight_date", headerName: "Flight Date", width: 150 },
    { field: "flight_time", headerName: "Flight Time", width: 120, renderCell: (params) => {return formatHHmm(params.row.flight_time);} },
    { field: "block_time", headerName: "Block Time", width: 150, renderCell: (params) => {return formatHHmm(params.row.block_time);} },
    { field: "block_off_time", headerName: "Block Off Time", width: 150,
    },
    { field: "takeoff_time", headerName: "Takeoff Time", width: 150, },
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
      headerName: "PIC ID",
      width: 150,
      renderCell: (params) => <ProfileName profileId={params.row.pic_id} />,
    },
    {
      field: "student_id",
      headerName: "Student ID",
      width: 150,
      renderCell: (params) =>
        params.row.student_id ? <ProfileName profileId={params.row.student_id} /> : <span>N/A</span>,
    },
    { field: "notes", headerName: "Notes", flex: 1 },
    {
      field: "created_at",
      headerName: "Created At",
      width: 180,
      renderCell: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 180,
      renderCell: ({ value }) => new Date(value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <EditButton hideText size="small" variant="outlined" resourceNameOrRouteName="logbook" recordItemId={row.id} />
          <ShowButton hideText size="small" variant="outlined" resourceNameOrRouteName="logbook" recordItemId={row.id} />
          <DeleteButton hideText size="small" variant="outlined" resourceNameOrRouteName="logbook" recordItemId={row.id} />
        </Stack>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  // Combine static columns and flight details dynamic columns.
  const columns: GridColDef[] = [...staticColumns, ...flightDetailColumns];

  return (
    <List title="Logbook Entries">
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
      />
    </List>
  );
}
