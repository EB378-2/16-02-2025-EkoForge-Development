"use client";

import React from "react";
import Link from "next/link";
import { useOne } from "@refinedev/core";
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { Blog } from "@/components/types";
import { useTheme } from "@customHooks/useTheme";


export default function BlogCard({ blog }: { blog: Blog }) {
  const theme = useTheme();
  const { data: profileData, isLoading: profileLoading } = useOne<any>({
    resource: "profiles",
    id: blog.profile_id,
    meta: { select: "first_name,last_name,avatar_url" },
  });

  const authorName = profileData?.data
    ? `${profileData.data.first_name} ${profileData.data.last_name}`
    : "Unknown";

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 1, borderRadius: 2, transition: '0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 } }}>
      <CardActionArea component={Link} href={`/members/blogs/show/${blog.id}`} sx={{ flexGrow: 1 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: "0.875rem", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {blog.content.substring(0, 200)}...
          </Typography>
          
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 'auto' }}>
            <Avatar 
              src={profileData?.data?.avatar_url} 
              sx={{ width: 24, height: 24 }} 
              alt={authorName}
            />
            <Typography variant="caption" color="text.secondary">
              {profileLoading ? "Loading..." : authorName}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Chip 
              label={blog.published_at ? format(parseISO(blog.published_at), 'MMM d') : "Draft"} 
              size="small" 
              color={blog.published_at ? "primary" : "default"}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
