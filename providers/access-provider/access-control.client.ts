// providers/access-provider/access-control.client.ts
'use client';
import { CanParams, CanReturnType } from "@refinedev/core";

export const accessControlProvider = {
  can: async ({ resource, action, params }: CanParams): Promise<CanReturnType> => {
    try {
      // Get role from localStorage only (hooks can't be used here)
      const role = typeof window !== 'undefined' 
        ? localStorage.getItem('user-role') || 'anonymous'
        : 'anonymous';

      // Prepare the request body
      const requestBody: Record<string, any> = {
        role,
        resource,
        action
      };

      // Add ID if it exists
      if (params?.id && typeof params.id === 'string') {
        requestBody.id = params.id;
      }

      // Call API route
      const res = await fetch('/api/check-permission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });
      console.log(role)

      if (!res.ok) throw new Error(`Permission check failed: ${res.status}`);

      const { allowed } = await res.json();
      
      return {
        can: allowed,
        reason: allowed ? undefined : `No ${action} access to ${resource}`
      };
    } catch (error) {
      console.error('Access control error:', error);
      return { 
        can: false, 
        reason: "Error checking permissions" 
      };
    }
  }
};