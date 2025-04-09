import { AuthPage } from "@components/auth-page";
import { getData } from "@/customHooks/getData";
import { redirect } from "next/navigation";

export default async function Login() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/members");
  }

  return <AuthPage type="login" />;
}
