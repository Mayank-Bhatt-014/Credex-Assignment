import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import SpendForm from "../components/SpendForm/SpendForm.jsx";

export default function Home() {
  return (
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
  );
}
