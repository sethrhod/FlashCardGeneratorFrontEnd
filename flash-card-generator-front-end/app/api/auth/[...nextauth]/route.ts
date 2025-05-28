import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth-config";

// NextAuth needs to be exported as both GET and POST for App Router API routes
const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
