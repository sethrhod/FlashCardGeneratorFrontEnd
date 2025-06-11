import "./globals.css";
import ClientRootLayout from "./clientRootLayout";
import handleGetAvailableLanguages from "@/lib/handleGetAvailableLanguages";
import { Client } from "@/lib/apiClient";
import nodeFetch from "node-fetch";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth-config";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  const api = new Client("https://localhost:7017", {
    fetch: nodeFetch as any,
  });
  const languages = await handleGetAvailableLanguages(api);

  return (
    <html lang="en">
      <body className="flex">
        <ClientRootLayout languages={languages} session={session}>
          {children}
        </ClientRootLayout>
      </body>
    </html>
  );
}
