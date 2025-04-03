import { authProviderServer } from "@/providers/auth-provider/auth-provider.server";
import { redirect } from "next/navigation";
import React from "react";
import { CanAccess } from "@refinedev/core";

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData();

  if (!data.authenticated) {
    return redirect(data?.redirectTo || "/login");
  }

  return <CanAccess  fallback={<div>You cannot access this section</div>}>{children}</CanAccess>;
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
  };
}