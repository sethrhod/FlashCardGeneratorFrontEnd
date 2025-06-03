import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <GoogleSignInButton />
    </div>
  );
}