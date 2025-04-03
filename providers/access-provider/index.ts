"use server";

import { newEnforcer } from "casbin";
import { CanParams, CanReturnType } from "@refinedev/core";

import { adapter, model } from "./permissions";
import { authProviderServer } from "@/providers/auth-provider/auth-provider.server";

export const accessControlProvider = async ({ resource, action }: CanParams): Promise<CanReturnType> => {
  const role = await authProviderServer.getPermissions?.() || "anonymous";
  console.log("role", role);

  const enforcer = await newEnforcer(model, adapter);
  const can = await enforcer.enforce(role, resource, action);

  return {
    can,
  };
};