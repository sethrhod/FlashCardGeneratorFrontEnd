import { NextAuthOptions, Profile } from "next-auth";
import nodeFetch from "node-fetch";
import GoogleProvider from "next-auth/providers/google";
import { Client, IdentityUserDto } from "./apiClient";

declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
}

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { prompt: "consent", access_type: "offline", response_type: "code" },
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.access_token = await tryFetchSecondAccessToken(profile as Profile, account.access_token as string);
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.access_token as string;
      return session // The return type will match the one returned in `useSession()`
    },
  },
};

async function tryFetchSecondAccessToken(profile: Profile, access_token?: string): Promise<string> {
  var secondToken: string;
  try {
    secondToken = await fetchSecondAccessToken(profile, access_token);
  } catch (error) {
    console.error("Error fetching second access token:", error);
    throw new Error("Failed to fetch second access token.");
  }
  return secondToken;
}

async function fetchSecondAccessToken(profile: Profile, access_token?: string): Promise<string> {
  if (!access_token || !profile.email || !profile.name) {
    throw new Error("Access token or profile information is missing.");
  }
  const user = new IdentityUserDto({
    email: profile.email,
    userName: profile.name
  });

  const api = new Client("https://localhost:7017", {
    fetch: nodeFetch as any,
  });

  const response = await api.loginOrRegisterUser(user);

  if (response.isFailed) {
    console.error("Error logging in or registering user:", response.errors);
    throw new Error(
      `Error logging in or registering user: ${response.errors
        ?.map((e) => e.message)
        .join(", ")}`
    );
  }

  if (!response.value) {
    console.error("No user data received from server.");
    throw new Error("No user data received from server.");
  }

  return response.value;
}
