import { useSideBarContext } from "@/models/Contexts";
import handleThirdPartyLoginResponse from "@/scripts/handle-third-party-login-response";
import { GoogleLogin } from "@react-oauth/google";

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
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleThirdPartyLoginResponse(
                credentialResponse,
                sidebarContext.setUser,
                sidebarContext.setError
              );
            }}
            onError={() => {
              sidebarContext.setError("Failed to log in with Google.");
            }}
          />
        </div>
      )}
      {sidebarContext.Error && <>{sidebarContext.Error}</>}
    </div>
  );
}
