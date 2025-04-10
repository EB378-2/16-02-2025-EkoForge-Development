// hooks/useAccessControl.ts
'use client';
import { useState, useCallback } from 'react';
import { CanParams, CanReturnType } from "@refinedev/core";

export function useAccessControl() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const can = useCallback(async ({ resource, action, params }: CanParams): Promise<CanReturnType> => {
    setLoading(true);
    setError(null);

    try {
      const role = typeof window !== 'undefined' 
        ? localStorage.getItem('user-role') || 'anonymous'
        : 'anonymous';

      const requestBody: Record<string, any> = {
        role,
        resource,
        action
      };

      if (params?.id && typeof params.id === 'string') {
        requestBody.id = params.id;
      }

      const res = await fetch('/api/check-permission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!res.ok) throw new Error(`Permission check failed: ${res.status}`);

      const { allowed } = await res.json();
      
      return {
        can: allowed,
        reason: allowed ? undefined : `No ${action} access to ${resource}`
      };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return { 
        can: false, 
        reason: "Error checking permissions" 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return { can, loading, error };
}