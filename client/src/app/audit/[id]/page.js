import { Container } from "react-bootstrap";
import AuditResults from "../../../components/AuditResults/AuditResults.jsx";

export async function generateMetadata({ params }) {
  return {
    title: "My AI Spend Audit - Credex",
    description: "See where I could save on AI tools",
    openGraph: {
      title: "I audited my AI tool spend with Credex",
      description: "Find out if you're overpaying for AI tools",
      url: `https://yourcredexapp.vercel.app/audit/${params.id}`,
    },
    twitter: {
      card: "summary",
      title: "I audited my AI tool spend",
      description: "Free AI spend audit by Credex",
    },
  };
}

export default function AuditPage() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Your Audit Results</h1>
      <AuditResults />
    </Container>
  );
}
