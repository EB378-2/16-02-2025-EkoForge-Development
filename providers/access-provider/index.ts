"use server";

import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";

import { adapter, model } from "./permissions";
import { authProviderServer } from "@/providers/auth-provider/auth-provider.server";

export const accessControlProvider = async ({ 
  resource, 
  action, 
  params 
}: CanParams): Promise<CanReturnType> => {
  const role = await authProviderServer.getPermissions?.() || "anonymous";
  //console.log("Checking permissions for:", { role, resource, action, params });
  
  const enforcer = await newEnforcer(model, adapter);

  // First check if we're dealing with list access
  if (action === "list") {
    const can = await enforcer.enforce(role, resource, "list");
    return { can };
  }

  // For other actions (delete, edit, show)
  if (action === "delete" || action === "edit" || action === "show") {
    const can = await enforcer.enforce(
      role,
      `${resource}/${params?.id}`,
      action
    );
    return { can };
  }

  // Default check for other actions (create, etc.)
  const can = await enforcer.enforce(role, resource, action);
  return { can };
};