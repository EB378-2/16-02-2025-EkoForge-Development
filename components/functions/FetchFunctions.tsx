"use client";

import React from "react";
import { useShow } from "@refinedev/core";
import { Typography } from "@mui/material";

export function ProfileName({ profileId }: { profileId: string }) {
    const { queryResult } = useShow({
      resource: "profiles",
      id: profileId,
      meta: { select: "first_name,last_name" },
      queryOptions: { enabled: !!profileId },
    });
    const profileData = queryResult?.data?.data as { first_name: string; last_name: string } | undefined;
    if (!profileData) return <span>Loading...</span>;
    return <span>{profileData.first_name} {profileData.last_name}</span>;
  }

export function ProfilePhone({ profileId }: { profileId: string }) {
    const { queryResult } = useShow({
      resource: "profiles",
      id: profileId,
      meta: { select: "phone_number" },
      queryOptions: { enabled: !!profileId },
    });
    const profileData = queryResult?.data?.data as { phone_number: string; } | undefined;
    if (!profileData) return <span>Loading...</span>;
    return <span>{profileData.phone_number}</span>;
  }

  
export function InstructorName({ instructorId }: { instructorId: string }) {
  const { queryResult } = useShow({
    resource: "instructors",
    id: instructorId,
    meta: { select: "profile_id" },
    queryOptions: { enabled: !!instructorId },
  });
  const data = queryResult?.data?.data as { profile_id: string } | undefined;
  if (!data) return <span>Loading...</span>;
  return <ProfileName profileId={data.profile_id} />;
}

export // Component to display a resource's name based on id.
function ResourceName({ id }: { id: string }) {
  const { queryResult } = useShow({
    resource: "resources",
    id: id,
    meta: { select: "name" },
    queryOptions: { enabled: !!id },
  });
  const resourceData = queryResult?.data?.data as { name: string } | undefined;
  if (!resourceData) return <span>Loading...</span>;
  return <span>{resourceData.name}</span>;
}

// Helper component to fetch and display the author's full name.
export function AuthorName({ profileId }: { profileId: string }) {
  const { queryResult } = useShow<{ first_name: string; last_name: string }>({
    resource: "profiles",
    id: profileId,
    meta: { select: "first_name,last_name" },
    queryOptions: { enabled: !!profileId },
  });
  const data = queryResult?.data?.data;
  if (!data) return <Typography variant="body2">Loading...</Typography>;
  return (
    <Typography variant="body2">
      {data.first_name} {data.last_name}
    </Typography>
  );
}