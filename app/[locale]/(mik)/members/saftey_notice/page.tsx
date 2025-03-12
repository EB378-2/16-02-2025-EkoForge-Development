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

export default function NoticesList() {
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
    } = useTable<Notice>({
        resource: "notices", // Must match your resource configuration
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
        {
            field: "id",
            headerName: "ID",
            width: 180,
        },
        {
            field: "title",
            headerName: "Title",
            width: 200,
        },
        {
            field: "message",
            headerName: "Message",
            flex: 1,
        },
        {
            field: "time_off_incident",
            headerName: "Time Off Incident",
            width: 200,
            renderCell: ({ value }) =>
                value ? new Date(value).toLocaleString() : "-",
        },
        {
            field: "submitted_by",
            headerName: "Submitted By",
            width: 180,
        },
        {
            field: "extra_parameters",
            headerName: "Extra Parameters",
            flex: 1,
            renderCell: ({ value }) => (value ? JSON.stringify(value) : "-"),
        },
        {
            field: "created_at",
            headerName: "Created At",
            width: 200,
            renderCell: ({ value }) => new Date(value).toLocaleString(),
        },
        {
            field: "updated_at",
            headerName: "Updated At",
            width: 200,
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
                        resourceNameOrRouteName="notices"
                        recordItemId={row.id}
                    />
                    <ShowButton
                        hideText
                        size="small"
                        variant="outlined"
                        resourceNameOrRouteName="notices"
                        recordItemId={row.id}
                    />
                    <DeleteButton
                        hideText
                        size="small"
                        variant="outlined"
                        resourceNameOrRouteName="notices"
                        recordItemId={row.id}
                    />
                </Stack>
            ),
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <List title="Safety Notices">
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
