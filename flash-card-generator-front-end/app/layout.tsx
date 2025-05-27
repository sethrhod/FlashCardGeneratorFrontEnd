import "./globals.css";
import { Client, Language } from "@/models/apiClient";
import nodeFetch from "node-fetch";
import ClientRootLayout from "./clientRootLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSideBarContext } from "@/models/Contexts";
import handleGetAvailableLanguages from "./actions/handleGetAvailableLanguages";
import { handleGetDecks } from "./actions/handleGetDecks";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarContext = useSideBarContext();

  //read secrets.json file
  const secrets = await import("../secrets.json");

  const clientId = secrets["Authentication"]["Google"]["ClientId"];
  if (!clientId) {
    throw new Error("ClientId not found in secrets.json");
  }

  const api = new Client("https://localhost:7017", { fetch: nodeFetch as any });

  const fetchAvailableLanguages = async () => {
    const availableLanguagesResponse = await handleGetAvailableLanguages(api);
    if (!availableLanguagesResponse.success) {
      sidebarContext.setError(
        "Error loading available languages: " +
          availableLanguagesResponse.message
      );
      return {}; // Return an empty object or handle as needed
    }
    // Convert class instances to plain objects
    const availableLanguages = JSON.parse(
      JSON.stringify(availableLanguagesResponse.data)
    ) as { [key: string]: Language };
    return availableLanguages;
  };

  const fetchDecks = async () => {
    const getDecksResponse = await handleGetDecks(api);
    if (!getDecksResponse.success) {
      return <div>Error loading decks</div>;
    }
    if (
      getDecksResponse.data == null ||
      Object.keys(getDecksResponse.data).length === 0
    ) {
      return <div>No decks available</div>;
    }
    // Convert class instances to plain objects
    const decks = JSON.parse(JSON.stringify(getDecksResponse.data));
    return decks;
  };

  const [availableLanguages, decks] = await Promise.all([
    fetchAvailableLanguages(),
    fetchDecks(),
  ]);

  // Fetch test decks only if user is logged in
  if (!sidebarContext.user) {
    console.warn("User not logged in, skipping deck fetch");
    return <App />;
  }

  return <App />;

  function App() {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <html lang="en">
          <body className="flex">
            <ClientRootLayout
              decks={decks}
              availableLanguages={availableLanguages}
            >
              {children}
            </ClientRootLayout>
          </body>
        </html>
      </GoogleOAuthProvider>
    );
  }
}
