"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";
import {
  useGetIdentity,
  useOne,
  useUpdate,
  HttpError,
} from "@refinedev/core";
import { useTranslations } from "next-intl";
import { EditButton } from "@refinedev/mui";
interface ProfileData {
  id: string;
  avatar?: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  streetaddress: string;
  city: string;
  country: string;
  zip: string;
  role: string;
}

export default function ProfilePage() {
  const t = useTranslations("Profile");

  // Get the current user's identity.
  const { data: identity } = useGetIdentity<{ id: string }>();
  const userId = identity?.id ?? "";

  // Fetch the profile data.
  const { data, isLoading, isError } = useOne<ProfileData, HttpError>({
    id: userId,
    meta: { select: "*" },
  });

  // Always call hooks. Later, we conditionally render based on the state.
  const profile = data?.data;

  return (
    <Box sx={{ p: 4 }}>
      {(!userId || isLoading) && <Typography>Loading profile...</Typography>}
      {isError && <Typography>Error loading profile</Typography>}
      {userId && profile && !isLoading && !isError && (
        <Grid container spacing={4}>
          {/* Left Column: Profile Card and Personal Notes */}
          <Grid item xs={12} md={12}>
            <Grid container spacing={4}>
              {/* Profile Card */}
              <Grid item xs={12}>
                <Card sx={{ margin: "auto", boxShadow: 3, borderRadius: 2 }}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      backgroundColor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 100,
                        minHeight: 100,
                        borderRadius: "50%",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Typography variant="h4" color="primary">
                          {profile.fullname
                            ? profile.fullname.charAt(0).toUpperCase()
                            : "?"}
                        </Typography>
                      )}
                    </Box>
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {profile.fullname || "No Name"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("email")}: {profile.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("username")}: {profile.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("phone")}: {profile.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("address")}: {profile.streetaddress}, {profile.city},{" "}
                      {profile.country} {profile.zip}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("role")}: {profile.role}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <EditButton recordItemId={profile.id} />
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
