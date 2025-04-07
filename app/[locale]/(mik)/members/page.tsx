"use client";

import React from "react";
import Link from "next/link";
import { useTable, useList, useGetIdentity, useOne } from "@refinedev/core";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Paper,
  Stack,
  Chip,
  Avatar,
  Divider,
  Skeleton,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";
import {
  CalendarToday,
  Flight,
  Article,
  Add,
  AccessTime,
  AirplaneTicket,
  FlightLand,
} from "@mui/icons-material";
import { format, parseISO, isAfter } from "date-fns";
import { ResourceName } from "@/components/functions/FetchFunctions";

// --------------------
// Interfaces
// --------------------

interface Blog {
  id: string;
  profile_id: string;
  title: string;
  content: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Booking {
  id?: string;
  profile_id: string;
  resource_id: string;
  start_time: string;
  end_time: string;
  title?: string;
  notes?: string;
  instructor_id?: string;
  flight_type?: string;
  created_at?: string;
  updated_at?: string;
}

interface Resource {
  id: string;
  name: string;
}

interface LogBookEntry {
  id: string;
  flight_date: string;
  flightHours: number;
}

// --------------------
// Blog Card Component
// --------------------

function BlogCard({ blog }: { blog: Blog }) {
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


// --------------------
// Booking Time Component
// --------------------
function BookingTime({ start, end }: { start: string; end: string }) {
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

  return (
    <Stack>
      <Typography variant="body2">
        {format(startDate, 'MMM d, yyyy')}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <AccessTime fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {format(startDate, 'HH:mm')} - {format(endDate, 'HH:mm')}
        </Typography>
        <Chip 
          label={`${duration.toFixed(1)}h`} 
          size="small" 
          color="primary"
          sx={{ ml: 1 }}
        />
      </Stack>
    </Stack>
  );
}

// --------------------
// Front Page Component
// --------------------
export default function FrontPage() {
  // Get current user identity
  const { data: identityData } = useGetIdentity<{ id: string }>();
  const currentUserId = identityData?.id;
  const currentDate = new Date();

  // Fetch blogs
  const { tableQueryResult: blogsQuery } = useTable<Blog>({
    resource: "blogs",
    initialSorter: [{ field: "published_at", order: "desc" }],
    initialPageSize: 6,
  });
  const blogs = blogsQuery?.data?.data ?? [];
  const blogsLoading = blogsQuery?.isLoading;

  // Fetch upcoming bookings
  const { data: bookingsData, isLoading: bookingsLoading } = useList<Booking>({
    resource: "bookings",
    filters: [
      { field: "profile_id", operator: "eq", value: currentUserId },
      { field: "start_time", operator: "gte", value: currentDate.toISOString() },
    ],
    sorters: [{ field: "start_time", order: "asc" }],
    meta: { select: "*" },
  });
  const myBookings = bookingsData?.data ?? [];

  // Fetch logbook data
  const { data: logbookData, isLoading: logbookLoading } = useList<LogBookEntry>({
    resource: "logbook",
    filters: [
      { field: "profile_id", operator: "eq", value: currentUserId },
    ],
    meta: { select: "*" },
  });
  const logbookEntries = logbookData?.data ?? [];

  // Prepare chart data
  const currentYear = currentDate.getFullYear();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const monthlyData = monthNames.map((month, index) => {
    const entriesThisMonth = logbookEntries.filter(entry => {
      // Add null check for entry and entry.date
      if (!entry || !entry.flight_date) return false;
      
      const entryDate = parseISO(entry.flight_date);
      return entryDate.getFullYear() === currentYear && entryDate.getMonth() === index;
    });
    
    const totalHours = entriesThisMonth.reduce((sum, entry) => {
      // Add null check for flightHours
      return sum + (entry?.flightHours || 0);
    }, 0);
    
    return {
      month,
      flightHours: totalHours,
    };
  });

  // Calculate total flight hours
  const totalFlightHours = logbookEntries.reduce((sum, entry) => sum + entry.flightHours, 0);

  // Define DataGrid columns for bookings
  const bookingColumns: GridColDef[] = [
    {
      field: "resource",
      headerName: "Aircraft",
      width: 120,
      renderCell: (params) => <ResourceName id={params.row.resource_id} />,
    },
    {
      field: "time",
      headerName: "Date & Time",
      width: 200,
      renderCell: (params) => (
        <BookingTime start={params.row.start_time} end={params.row.end_time} />
      ),
    },
    {
      field: "type",
      headerName: "Type",
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.row.flight_type || "General"} 
          size="small" 
          color="secondary"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <Button 
          variant="outlined" 
          size="small" 
          component={Link}
          href={`/members/bookings/edit/${params.row.id}`}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Left Column - Blog and Stats */}
        <Grid item xs={12} md={8}>
          {/* Welcome Section */}
          <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <Typography variant="h5" gutterBottom>
              Welcome Back!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Stay updated with the latest club news and manage your flights.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<AirplaneTicket />}
                component={Link}
                href="/members/bookings"
              >
                New Booking
              </Button>
              <Button 
                variant="outlined" 
                sx={{ color: 'primary.contrastText', borderColor: 'primary.contrastText' }}
                startIcon={<Article />}
                component={Link}
                href="/members/blogs/create"
              >
                Write Post
              </Button>
              <Button 
                variant="outlined" 
                sx={{ color: 'primary.contrastText', borderColor: 'primary.contrastText' }}
                startIcon={<FlightLand />}
                component={Link}
                href="/members/logbook/create"
              >
                Log Flight
              </Button>
            </Stack>
          </Paper>

          {/* Blog Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                <Article sx={{ verticalAlign: 'middle', mr: 1 }} />
                Latest Club News
              </Typography>
              <Button 
                variant="text" 
                size="small" 
                component={Link}
                href="/blogs"
                endIcon={<Add fontSize="small" />}
              >
                See More
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

          {/* Flight Stats Section */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <Flight sx={{ verticalAlign: 'middle', mr: 1 }} />
              Your Flight Statistics
            </Typography>
            
            <Grid container spacing={3}>
              {/* Flight Hours Chart */}
              <Grid item xs={12} md={8}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Monthly Flight Hours ({currentYear})
                </Typography>
                <Box sx={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          fontSize: 12,
                          borderRadius: 4,
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value) => [`${value} hours`, "Flight Hours"]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Bar 
                        dataKey="flightHours" 
                        fill="#1976d2" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Grid>
              
              {/* Summary Stats */}
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Flight Summary
                </Typography>
                <Stack spacing={2}>
                  <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
                    <Typography variant="body2" color="text.secondary">
                      Total Flight Hours
                    </Typography>
                    <Typography variant="h4">
                      {totalFlightHours.toFixed(1)}
                    </Typography>
                  </Paper>
                  
                  <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
                    <Typography variant="body2" color="text.secondary">
                      Flights This Year
                    </Typography>
                    <Typography variant="h4">
                      {logbookEntries.filter(e => parseISO(e.flight_date).getFullYear() === currentYear).length}
                    </Typography>
                  </Paper>
                  
                  <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
                    <Typography variant="body2" color="text.secondary">
                      Upcoming Bookings
                    </Typography>
                    <Typography variant="h4">
                      {myBookings.length}
                    </Typography>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column - Bookings */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                <CalendarToday sx={{ verticalAlign: 'middle', mr: 1 }} />
                Your Upcoming Bookings
              </Typography>
              <Tooltip title="Create new booking">
                <IconButton 
                  color="primary" 
                  component={Link}
                  href="/members/bookings"
                >
                  <Add />
                </IconButton>
              </Tooltip>
            </Stack>
            
            {bookingsLoading ? (
              <Stack spacing={1}>
                {[1, 2, 3].map((item) => (
                  <Skeleton key={item} variant="rectangular" height={80} />
                ))}
              </Stack>
            ) : myBookings.length > 0 ? (
              <>
                <Box sx={{ height: 500 }}>
                  <DataGrid
                    rows={myBookings}
                    columns={bookingColumns}
                    pageSizeOptions={[5, 10]}
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: 5 },
                      },
                    }}
                    getRowId={(row) => row.id}
                    disableRowSelectionOnClick
                    sx={{
                      '& .MuiDataGrid-cell': {
                        py: 1,
                      },
                      '& .MuiDataGrid-columnHeaders': {
                        bgcolor: 'background.default',
                      },
                    }}
                  />
                </Box>
                <Button 
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2 }}
                  component={Link}
                  href="/members/bookings"
                >
                  View All Bookings
                </Button>
              </>
            ) : (
              <Box textAlign="center" py={4}>
                <Flight fontSize="large" color="action" sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="body1" color="text.secondary" mb={2}>
                  No upcoming bookings
                </Typography>
                <Button 
                  variant="contained"
                  component={Link}
                  href="/members/bookings/create"
                  startIcon={<Add />}
                >
                  Book a Flight
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}