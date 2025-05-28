import { useSideBarContext } from "@/models/Contexts";
import GoogleSignInButton from "./GoogleSignInButton";

export default function LoginComponent() {
  const sidebarContext = useSideBarContext();

  return (
    <div className="flex h-full mb-4 items-end text-gray-300">
      {sidebarContext.user ? (
        <div className="flex flex-col space-y-4">
          <p>Welcome, {sidebarContext.user.userName}</p>
          <p>Email: {sidebarContext.user.email}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p>Please log in to access your account.</p>
          <GoogleSignInButton />
        </div>
      )}
      {sidebarContext.Error && <>{sidebarContext.Error}</>}
    </div>
  );
}
