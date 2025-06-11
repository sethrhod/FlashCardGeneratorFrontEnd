import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth-config";

export default async function RedirectPage() {
  // 1) Auth guard
  const session = await getServerSession(authConfig);

  if (!session) redirect("/login");

  if (session.accessToken) {
    // 2) Redirect to home page if access token is available
    redirect("/");
  }

  throw new Error(
    "Second access token not available in session. Please log in again."
  );
}
