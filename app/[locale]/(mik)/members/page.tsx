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
    } = useTable({
        resource: "notices", // <-- Replace with your resource name
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
            width: 70,
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
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: function render({ row }) {
                return (
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
                );
            },
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <List title="Safety Notices">
            <Box mb={2}>
                <Typography variant="h4" gutterBottom>
                    Safety Notices
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    href="/members/saftey_notice/create"
                >
                    Create Notice
                </Button>
            </Box>

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
