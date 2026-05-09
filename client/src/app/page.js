import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import SpendForm from "../components/SpendForm/SpendForm.jsx";

export default function Home() {
  return (
    <>
      <nav
        style={{
          borderBottom: "1px solid #e5e7eb",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>⚡ SpendAudit</span>
        <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          Powered by Credex
        </span>
      </nav>

      <Container className="py-4">
        <section className="text-center py-5">
          <h1 className="display-4 fw-bold mb-3">
            Find Out If You&apos;re Overpaying for AI Tools
          </h1>
          <p className="lead mb-0">
            Free 2-minute audit for startups and developers. No signup required.
          </p>
        </section>

        <SpendForm />
      </Container>
    </>
  );
}
