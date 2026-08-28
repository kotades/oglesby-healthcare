import Login from "~/auth/login-view";

export const generateMetadata = async () => ({
  title: "Client & Consultant Sign In | Oglesby Healthcare Consulting",
  description: "Sign in to Oglesby Healthcare Consulting client portal and practice compliance dashboard.",
});

export default function ServerPage() {
  return <Login />;
}
