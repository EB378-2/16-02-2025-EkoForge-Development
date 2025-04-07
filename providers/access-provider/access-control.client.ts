// providers/access-control.ts
'use client';
import { CanParams, CanReturnType } from "@refinedev/core";

export const accessControlProvider = {
  can: async ({ resource, action }: CanParams): Promise<CanReturnType> => {
    try {
      // Get role from localStorage (set by SessionSync)
      const role = localStorage.getItem('user-role') || 'anonymous';
      
      // Call API route to check permissions
      const res = await fetch('/api/check-permission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, resource, action })
      });
      
      const { allowed } = await res.json();
      
      return {
        can: allowed,
        reason: allowed ? undefined : "Unauthorized"
      };
    } catch (error) {
      return { can: false, reason: "Error checking permissions" };
    }
  }
};