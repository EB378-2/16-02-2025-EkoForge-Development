"use server";

import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";

import { adapter, model } from "./permissions";
import { authProviderServer } from "@/providers/auth-provider/auth-provider.server";

export const accessControlProvider = async ({ resource, action, params }: CanParams): Promise<CanReturnType> => {
  const role = await authProviderServer.getPermissions?.() || "anonymous";
  console.log("role", role);
  

  const enforcer = await newEnforcer(model, adapter);
  if (action === "delete" || action === "edit" || action === "show") {
    const can = await enforcer.enforce(
      role,
      `${resource}/${params?.id}`,
      action,
    );

    return { can };
  }
  const can = await enforcer.enforce(role, resource, action);

  return {
    can,
  };
};