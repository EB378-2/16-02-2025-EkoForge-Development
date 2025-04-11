"use client";

import React from "react";
import Link from "next/link";
import { useTable, useGetIdentity } from "@refinedev/core";
import {
  Typography,
  Grid,
  Button,
  Paper,
  Stack,
  Skeleton,
} from "@mui/material";
import {
  Article,
  Add
} from "@mui/icons-material";
import { Blog } from "@/components/types";
import { useTheme } from "@customHooks/useTheme";
import { useTranslations } from "next-intl";
import BlogCard from "@components/(MIK)/Members/Dashboard/BlogCard"

// --------------------
// Front Page Component
// --------------------
export default function BlogSection() {
  const theme = useTheme();
  const t = useTranslations("Dashboard");
  // Fetch blogs
  const { tableQueryResult: blogsQuery } = useTable<Blog>({
    resource: "blogs",
    initialSorter: [{ field: "published_at", order: "desc" }],
    initialPageSize: 6,
  });
  const blogs = blogsQuery?.data?.data ?? [];
  const blogsLoading = blogsQuery?.isLoading;


  return (
    <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
                <Article sx={{ verticalAlign: 'middle', mr: 1 }} />
                {t("LatestClubNews")} 
            </Typography>
            <Button 
                variant="text" 
                size="small" 
                component={Link}
                href="/blog"
                endIcon={<Add fontSize="small" />}
            >
                {t("SeeMore")} 
            </Button>
        </Stack>
        
        {blogsLoading ? (
            <Grid container spacing={2}>
                {[1, 2, 3].map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                        <Skeleton variant="rectangular" height={180} />
                    </Grid>
                ))}
            </Grid>
        ) : blogs.length > 0 ? (
            <Grid container spacing={2}>
                {blogs.map((blog) => (
                    <Grid item xs={12} sm={6} md={4} key={blog.id}>
                        <BlogCard blog={blog} />
                    </Grid>
                ))}
            </Grid>
        ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                No blog posts available
            </Typography>
        )}
    </Paper>
  );
}