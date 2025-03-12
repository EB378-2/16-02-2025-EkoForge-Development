"use client";

import React from "react";
import {
    List,
    EditButton,
    ShowButton,
    DeleteButton,
} from "@refinedev/mui";
import { useTable } from "@refinedev/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";

interface Logbook {
    id: number;
    profile_id: string;
    resource_id: number;
    flight_date: string; // ISO date string
    flight_time: number;
    notes?: string;
    block_off_time?: string;
    takeoff_time?: string;
    landing_time?: string;
    block_on_time?: string;
    block_of_time?: number;
    landings?: number;
    flight_details: Record<string, any>;
    fuel_left?: number;
    billing_info?: string;
    pax?: number;
    departure_place?: string;
    arrival_place?: string;
    flight_type?: string;
    pic_id?: string;
    student_id?: string;
    created_at: string;
    updated_at: string;
}

export default function LogbookList() {
    const {
        tableQueryResult,
        pageCount,
        current,
        setCurrent,
        pageSize,
        setPageSize,
        sorter,
        setSorter,
        filters,
        setFilters,
    } = useTable<Logbook>({
        resource: "logbook", // This must match your resource configuration
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

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "profile_id", headerName: "Profile ID", width: 150 },
        { field: "resource_id", headerName: "Resource ID", width: 120 },
        { field: "flight_date", headerName: "Flight Date", width: 150 },
        { field: "flight_time", headerName: "Flight Time", width: 120 },
        { field: "notes", headerName: "Notes", flex: 1 },
        { field: "block_off_time", headerName: "Block Off Time", width: 150 },
        { field: "takeoff_time", headerName: "Takeoff Time", width: 150 },
        { field: "landing_time", headerName: "Landing Time", width: 150 },
        { field: "block_on_time", headerName: "Block On Time", width: 150 },
        { field: "block_of_time", headerName: "Block Of Time", width: 150 },
        { field: "landings", headerName: "Landings", width: 100 },
        {
            field: "flight_details",
            headerName: "Flight Details",
            flex: 1,
            renderCell: ({ value }) => JSON.stringify(value),
        },
        { field: "fuel_left", headerName: "Fuel Left", width: 120 },
        { field: "billing_info", headerName: "Billing Info", flex: 1 },
        { field: "pax", headerName: "PAX", width: 100 },
        { field: "departure_place", headerName: "Departure Place", width: 150 },
        { field: "arrival_place", headerName: "Arrival Place", width: 150 },
        { field: "flight_type", headerName: "Flight Type", width: 150 },
        { field: "pic_id", headerName: "PIC ID", width: 150 },
        { field: "student_id", headerName: "Student ID", width: 150 },
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
                    <EditButton
                        hideText
                        size="small"
                        variant="outlined"
                        resourceNameOrRouteName="logbook"
                        recordItemId={row.id}
                    />
                    <ShowButton
                        hideText
                        size="small"
                        variant="outlined"
                        resourceNameOrRouteName="logbook"
                        recordItemId={row.id}
                    />
                    <DeleteButton
                        hideText
                        size="small"
                        variant="outlined"
                        resourceNameOrRouteName="logbook"
                        recordItemId={row.id}
                    />
                </Stack>
            ),
            sortable: false,
            filterable: false,
        },
    ];

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
