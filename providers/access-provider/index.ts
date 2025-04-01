"use server";

import { newEnforcer } from "casbin";
import { model, adapter } from "@/providers/access-provider/adapter"; // Ensure correct import
import { cookies } from "next/headers";
import { CanParams } from "@refinedev/core"; // Ensure correct import

export const accessControlProvider = async ({ action = "list", params, resource }: CanParams) => {
  const cookieStore = cookies();
  const role = cookieStore.get("role")?.value || "anonymous"; // Default to "anonymous" if no role is found

  const enforcer = await newEnforcer(model, adapter);

  let object = resource;

  if (["edit", "delete", "show"].includes(action) && params?.id !== undefined) {
    object = `${resource}/${String(params.id)}`; // Ensure id is a string
  } else if (action === "field" && params?.field !== undefined) {
    object = `${resource}/${params.field}`;
  }


  return {
    can: await enforcer.enforce(role, object, action),
    
  };
};
