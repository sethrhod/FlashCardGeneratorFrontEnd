import "./globals.css";
import ClientRootLayout from "./clientRootLayout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}
