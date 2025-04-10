"use client";

import React, { useEffect } from "react";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { FormProvider, useFormContext } from "react-hook-form";
import { Box, Grid, TextField, MenuItem, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { format } from "date-fns";
import { useList } from "@refinedev/core";
import { Logbook } from "@/components/types";

function FlightDetailsSection() {
  const { setValue } = useFormContext<Logbook>();
  const [nfChecked, setNfChecked] = React.useState(false);
  const [tglChecked, setTglChecked] = React.useState(false);
  const [nfDetail, setNfDetail] = React.useState("");
  const [tglDetail, setTglDetail] = React.useState("");

  useEffect(() => {
    const details: Record<string, string> = {};
    if (nfChecked) {
      details.nf = nfDetail;
    }
    if (tglChecked) {
      details.tgl = tglDetail;
    }
    setValue("flight_details", details);
  }, [nfChecked, nfDetail, tglChecked, tglDetail, setValue]);

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={nfChecked}
                onChange={(e) => setNfChecked(e.target.checked)}
              />
            }
            label="NF"
          />
        </Grid>
        {nfChecked && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="NF Details (Time)"
              value={nfDetail}
              onChange={(e) => setNfDetail(e.target.value)}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={tglChecked}
                onChange={(e) => setTglChecked(e.target.checked)}
              />
            }
            label="TGL"
          />
        </Grid>
        {tglChecked && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="TGL Details (Airports)"
              value={tglDetail}
              onChange={(e) => setTglDetail(e.target.value)}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default function LogbookEditPage() {
  const methods = useForm<Logbook>({
    defaultValues: {
      flight_date: format(new Date(), "yyyy-MM-dd"),
      flight_time: "0000",
      flight_details: {},
      block_time: "0000",
    },
  });

  const {
    register,
    watch,
    setValue,
    formState: { errors },
    saveButtonProps,
  } = methods;

  // Fetch profiles for the PIC select
  const { data: profilesData } = useList<{
    id: string;
    first_name: string;
    last_name: string;
  }>({
    resource: "profiles",
    meta: { select: "id,first_name,last_name" },
  });
  // Fetch resources for the Resource select
  const { data: resourceData } = useList<{
    id: string;
    name: string;
  }>({
    resource: "resources",
    meta: { select: "id,name" }
  });

  // Watch takeoff and landing times for flight time calculation
  const takeoff = watch("takeoff_time");
  const landing = watch("landing_time");

  useEffect(() => {
    if (takeoff && landing) {
      const formattedTakeoff = takeoff.length === 5 ? `${takeoff}:00` : takeoff;
      const formattedLanding = landing.length === 5 ? `${landing}:00` : landing;
      const takeoffTime = new Date(`1970-01-01T${formattedTakeoff}`);
      const landingTime = new Date(`1970-01-01T${formattedLanding}`);
      const diffMs = landingTime.getTime() - takeoffTime.getTime();
      if (diffMs > 0) {
        const totalMinutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formatted = `${hours.toString().padStart(2, "0")}${minutes
          .toString()
          .padStart(2, "0")}`;
        setValue("flight_time", formatted);
      } else {
        setValue("flight_time", "0000");
      }
    }
  }, [takeoff, landing, setValue]);

  // Watch block off and block on times for block time calculation
  const blockOff = watch("block_off_time");
  const blockOn = watch("block_on_time");

  useEffect(() => {
    if (blockOff && blockOn) {
      const formattedBlockOff = blockOff.length === 5 ? `${blockOff}:00` : blockOff;
      const formattedBlockOn = blockOn.length === 5 ? `${blockOn}:00` : blockOn;
      const offTime = new Date(`1970-01-01T${formattedBlockOff}`);
      const onTime = new Date(`1970-01-01T${formattedBlockOn}`);
      const diffMs = onTime.getTime() - offTime.getTime();
      if (diffMs > 0) {
        const totalMinutes = Math.floor(diffMs / 60000);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formatted = `${hours.toString().padStart(2, "0")}${minutes
          .toString()
          .padStart(2, "0")}`;
        setValue("block_time", formatted);
      } else {
        setValue("block_time", "0000");
      }
    }
  }, [blockOff, blockOn, setValue]);

  return (
    <Edit title="Edit Logbook Entry" saveButtonProps={saveButtonProps}>
      <FormProvider {...methods}>
        {/* Mobile View */}
        <Box
          component="form"
          sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column", gap: 2, p: 4 }}
        >
          <Grid container spacing={2}>
            {/* Row 1: Flight Date */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Flight Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("flight_date", { required: "Flight date is required" })}
                error={!!errors.flight_date}
                helperText={errors.flight_date?.message?.toString()}
              />
            </Grid>
            {/* Row 2: Resource */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Resource"
                value={watch("resource_id") || ""}
                {...register("resource_id")}
              >
                {resourceData?.data?.map((resource) => (
                  <MenuItem key={resource.id} value={resource.id}>
                    {resource.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Row 3: Block Off Time */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Block Off Time"
                type="time"
                inputProps={{ step: 1 }}
                InputLabelProps={{ shrink: true }}
                {...register("block_off_time")}
              />
            </Grid>
            {/* Row 4: Takeoff Time */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Takeoff Time"
                type="time"
                inputProps={{ step: 1 }}
                InputLabelProps={{ shrink: true }}
                {...register("takeoff_time")}
              />
            </Grid>
            {/* Row 5: Landing Time */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Landing Time"
                type="time"
                inputProps={{ step: 1 }}
                InputLabelProps={{ shrink: true }}
                {...register("landing_time")}
              />
            </Grid>
            {/* Row 6: Block On Time */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Block On Time"
                type="time"
                inputProps={{ step: 1 }}
                InputLabelProps={{ shrink: true }}
                {...register("block_on_time")}
              />
            </Grid>
            {/* Row 7: Block Time & Flight Time */}
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ width: '100%' }}>
                Block Time (HHmm): {watch("block_time")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ width: '100%' }}>
                Flight Time (HHmm): {watch("flight_time")}
              </Typography>
            </Grid>
            {/* Row 8: DEP */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Departure Place (DEP)"
                {...register("departure_place")}
              />
            </Grid>
            {/* Row 9: ARR */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Arrival Place (ARR)"
                {...register("arrival_place")}
              />
            </Grid>
            {/* Row 10: Landings */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Landings"
                type="number"
                {...register("landings", { valueAsNumber: true })}
              />
            </Grid>
            {/* Row 11: PIC */}
            <Grid item xs={12}>
            <TextField
                fullWidth
                select
                label="PIC"
                value={watch("pic_id") || ""}
                {...register("pic_id")}
              >
                {profilesData?.data?.map((profile) => (
                  <MenuItem key={profile.id} value={profile.id}>
                    {profile.first_name} {profile.last_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Row 12: Student */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Student"
                value={watch("student_id") || ""}
                onChange={(e) => setValue("student_id", e.target.value || null)}
              >
                <MenuItem>
                  <em>N/a</em>
                </MenuItem>
                {profilesData?.data?.map((profile) => (
                  <MenuItem key={profile.id} value={profile.id}>
                    {profile.first_name} {profile.last_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Row 13: PAX */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="PAX"
                type="number"
                {...register("pax", { valueAsNumber: true })}
              />
            </Grid>
            {/* Row 14: Flight Type */}
            <Grid item xs={12}>
              <TextField fullWidth label="Flight Type" {...register("flight_type")} />
            </Grid>
            {/* Row 15: Flight Details */}
            <Grid item xs={12}>
              <FlightDetailsSection />
            </Grid>
            {/* Row 16: Fuel */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fuel Left"
                type="number"
                {...register("fuel_left", { valueAsNumber: true })}
              />
            </Grid>
            {/* Row 17: Notes */}
            <Grid item xs={12}>
              <TextField fullWidth label="Notes" multiline rows={3} {...register("notes")} />
            </Grid>
            {/* Row 18: Billing */}
            <Grid item xs={12}>
              <TextField fullWidth label="Billing Info" {...register("billing_info")} />
            </Grid>
          </Grid>
        </Box>

        {/* Desktop View */}
        <Box
          component="form"
          sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", gap: 2, p: 4 }}
        >
          <Grid container spacing={2}>
            {/* Row 1: Flight Date & Resource */}
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Flight Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("flight_date", { required: "Flight date is required" })}
                error={!!errors.flight_date}
                helperText={errors.flight_date?.message?.toString()}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                select
                label="Resource"
                value={watch("resource_id") || ""}
                {...register("resource_id")}
              >
                {resourceData?.data?.map((resource) => (
                  <MenuItem key={resource.id} value={resource.id}>
                    {resource.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Row 2: Block Off Time & Block Time */}
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Block Off Time"
                type="time"
                inputProps={{ step: 1 }}
                InputLabelProps={{ shrink: true }}
                {...register("block_off_time")}
              />
            </Grid>
            <Grid item sm={6}>
              <Typography variant="body1" sx={{ width: '100%' }}>
                Block Time (HHmm): {watch("block_time")}
              </Typography>
            </Grid>
            {/* Row 3: Takeoff Time & Flight Time */}
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Takeoff Time"
                type="time"
                inputProps={{ step: 1 }}
                InputLabelProps={{ shrink: true }}
                {...register("takeoff_time")}
              />
            </Grid>
            <Grid item sm={6}>
              <Typography variant="body1" sx={{ width: '100%' }}>
                Flight Time (HHmm): {watch("flight_time")}
              </Typography>
            </Grid>
            {/* Row 4: Landing Time & DEP */}
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Landing Time"
                type="time"
                inputProps={{ step: 1 }}
                InputLabelProps={{ shrink: true }}
                {...register("landing_time")}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Departure Place (DEP)"
                {...register("departure_place")}
              />
            </Grid>
            {/* Row 5: Block On Time & ARR */}
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Block On Time"
                type="time"
                inputProps={{ step: 1 }}
                InputLabelProps={{ shrink: true }}
                {...register("block_on_time")}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Arrival Place (ARR)"
                {...register("arrival_place")}
              />
            </Grid>
            {/* Row 6: PIC & Student */}
            <Grid item sm={6}>
              <TextField
                fullWidth
                select
                label="PIC"
                value={watch("pic_id") || ""}
                {...register("pic_id")}
              >
                {profilesData?.data?.map((profile) => (
                  <MenuItem key={profile.id} value={profile.id}>
                    {profile.first_name} {profile.last_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                select
                label="Student"
                value={watch("student_id") || ""}
                onChange={(e) => setValue("student_id", e.target.value || null)}
              >
                <MenuItem>
                  <em>N/a</em>
                </MenuItem>
                {profilesData?.data?.map((profile) => (
                  <MenuItem key={profile.id} value={profile.id}>
                    {profile.first_name} {profile.last_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Row 7: PAX & Landings */}
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="PAX"
                type="number"
                {...register("pax", { valueAsNumber: true })}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Landings"
                type="number"
                {...register("landings", { valueAsNumber: true })}
              />
            </Grid>
            {/* Row 8: Fuel & Flight Type */}
            <Grid item sm={6}>
              <TextField
                fullWidth
                label="Fuel Left"
                type="number"
                {...register("fuel_left", { valueAsNumber: true })}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField fullWidth label="Flight Type" {...register("flight_type")} />
            </Grid>
            {/* Row 9: Flight Details */}
            <Grid item sm={12}>
              <FlightDetailsSection />
            </Grid>
            {/* Row 10: Notes */}
            <Grid item sm={12}>
              <TextField fullWidth label="Notes" multiline rows={3} {...register("notes")} />
            </Grid>
            {/* Row 11: Billing */}
            <Grid item sm={12}>
              <TextField fullWidth label="Billing Info" {...register("billing_info")} />
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </Edit>
  );
}