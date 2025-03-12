"use client";

import React, { useEffect } from "react";
import { Box, Grid, Typography, TextField, Button, Avatar, Stack, FormControl, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useGetIdentity } from "@refinedev/core";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

interface ProfileData {
  email: string;
  username: string;
  fullname: string;
  phone: string;
  streetaddress: string;
  city: string;
  country: string;
  zip: string;
  role: string;
  ratings: string[]; // Aviation related ratings stored as an array of strings.
}

export default function ProfileEdit() {
  const t = useTranslations("Profile");

  // Get the current user's identity.
  const { data: identity } = useGetIdentity<{ id: string }>();
  const userId = identity?.id ?? "";

  // useForm hook to manage the edit form.
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileData>({
    defaultValues: {},
    refineCoreProps: { meta: { select: "*" } },
  });

  // Get current profile data if available.
  const profileData = queryResult?.data?.data as ProfileData | undefined;

  // Reset form values when profile data is fetched.
  useEffect(() => {
    if (profileData) {
      reset(profileData);
    }
  }, [profileData, reset]);

  if (formLoading || !userId) {
    return <Typography>Loading profile...</Typography>;
  }

  if (!profileData) {
    return <Typography>Error loading profile</Typography>;
  }

  // Define the options for aviation related ratings.
  const ratingOptions = ["VFR", "IFR", "Night", "Multi-Engine", "Instructor"];

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        autoComplete="off"
      >
        {/* Email */}
        <TextField
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email ? String(errors.email.message) : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Email"
        />

        {/* Username */}
        <TextField
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username ? String(errors.username.message) : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Username"
        />

        {/* Full Name */}
        <TextField
          {...register("fullname", { required: "Full Name is required" })}
          error={!!errors.fullname}
          helperText={errors.fullname ? String(errors.fullname.message) : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Full Name"
        />

        {/* Phone */}
        <TextField
          {...register("phone", { required: "Phone is required" })}
          error={!!errors.phone}
          helperText={errors.phone ? String(errors.phone.message) : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Phone"
        />

        {/* Street Address */}
        <TextField
          {...register("streetaddress", { required: "Street Address is required" })}
          error={!!errors.streetaddress}
          helperText={errors.streetaddress ? String(errors.streetaddress.message) : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Street Address"
        />

        {/* City */}
        <TextField
          {...register("city", { required: "City is required" })}
          error={!!errors.city}
          helperText={errors.city ? String(errors.city.message) : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="City"
        />

        {/* Country */}
        <TextField
          {...register("country", { required: "Country is required" })}
          error={!!errors.country}
          helperText={errors.country ? String(errors.country.message) : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Country"
        />

        {/* Zip Code */}
        <TextField
          {...register("zip", { required: "Zip is required" })}
          error={!!errors.zip}
          helperText={errors.zip ? String(errors.zip.message) : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Zip Code"
        />

        {/* Role */}
        <TextField
          {...register("role", { required: "Role is required" })}
          error={!!errors.role}
          helperText={errors.role ? String(errors.role.message) : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Role"
        />

        {/* Aviation Ratings Checkbox Group */}
        <Controller
          name="ratings"
          control={control}
          render={({ field }) => {
            const currentRatings: string[] = field.value || [];
            const handleCheckboxChange = (option: string, checked: boolean) => {
              let newRatings = currentRatings;
              if (checked) {
                newRatings = [...currentRatings, option];
              } else {
                newRatings = currentRatings.filter((rating) => rating !== option);
              }
              field.onChange(newRatings);
            };
            return (
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <Typography variant="h6">Aviation Ratings</Typography>
                <FormGroup row>
                  {ratingOptions.map((option) => (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={currentRatings.includes(option)}
                          onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                        />
                      }
                      label={option}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            );
          }}
        />
      </Box>
    </Edit>
  );
}
