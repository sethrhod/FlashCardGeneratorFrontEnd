import { Client, LoginRequest, RegisterRequest } from "@/lib/apiClient";
import User from "@/models/User";
import { JwtPayload, jwtDecode, JwtDecodeOptions } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  unique_name: string;
}

export default async function handleThirdPartyLoginResponse(
  response: any,
  setUser: (user: User | null) => void,
  setError: (error: string | null) => void
) {
  if (response.error) {
    setError(response.error);
    return;
  }

  const api = new Client('https://localhost:7017');
  const token = response.credential;
  if (!token) {
    setError("No token received from Google.");
    return;
  }

    return await trySendGoogleToken(api, token, setUser, setError);
}

async function trySendGoogleToken(
  api: Client,
  token: string,
  setUser: (user: User | null) => void,
  setError: (error: string | null) => void
) {
  try {
    const response = await api.sendGoogleToken(token);
  if (response.isFailed) {
    console.error("Error sending Google token:", response.errors);
    setError("Failed to authenticate with Google.");
    return null;
  }
  if (!response.value) {
    console.error("No user data received from server.");
    setError("No user data received from server.");
    return null;
  }
  // Decode the JWT payload to extract user information
    const payload = jwtDecode(response.value) as CustomJwtPayload;
    setUser(
      new User(
        payload.sub!, // sub is the user ID
        payload.email,
        payload.unique_name
      )
    );
  } catch (error) {
    console.error("Error sending Google token:", error);
    setError("Failed to authenticate with Google.");
    return null;
  }
}