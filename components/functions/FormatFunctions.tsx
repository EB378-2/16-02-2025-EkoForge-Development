"use client";

import React from "react";
import { format, parseISO } from "date-fns";

export const formatDateForInput = (dateStr: string) => {
  try {
    return format(parseISO(dateStr), "yyyy-MM-dd'T'HH:mm");
  } catch {
    return "";
  }
};


// Helper to format time strings as four-digit HHmm.
export function formatHHmm(value: string | number | null | undefined): string {
  if (!value) return "0000";
  if (typeof value === "number") return value.toString().padStart(4, "0");
  if (typeof value === "string") return value.padStart(4, "0");
  return "0000";
}


export interface Notice {
    id: string;
    title: string;
    message: string;
    time_off_incident?: string;
    submitted_by: string;
    extra_parameters?: Record<string, any>;
    created_at: string;
    updated_at: string;
  }
  
export function getExtraParameterKeys(rows: Notice[]): string[] {
    const keys = new Set<string>();
    rows.forEach((row) => {
      if (row.extra_parameters && typeof row.extra_parameters === "object") {
        Object.keys(row.extra_parameters).forEach((key) => keys.add(key));
      }
    });
    return Array.from(keys);
  }