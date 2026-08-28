import Signup from "~/signup-view";

export const generateMetadata = async () => ({
  title: "Client & Consultant Registration | Oglesby Healthcare Consulting",
  description: "Join Shreveport's premier clinical compliance, HIPAA audit readiness, and practice management portal.",
});

export default function ServerPage() {
  return <Signup />;
}
