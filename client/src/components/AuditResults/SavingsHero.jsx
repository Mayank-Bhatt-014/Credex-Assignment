"use client";

import { Alert, Col, Row } from "react-bootstrap";

function formatSavings(value) {
  return `$${Number(value || 0).toLocaleString()}`;
}

export default function SavingsHero({
  totalMonthlySavings,
  totalAnnualSavings,
  isOptimal,
}) {
  if (isOptimal) {
    return (
      <Alert variant="success" className="mb-4">
        You&apos;re spending well on AI tools 🎉 No significant savings found.
      </Alert>
    );
  }

  return (
    <section className="mb-5">
      {totalMonthlySavings > 500 && (
        <Alert variant="dark" className="mb-4">
          You could save even more with Credex discounted credits →{" "}
          <Alert.Link href="https://credex.rocks">
            Book a free consultation
          </Alert.Link>
        </Alert>
      )}

      <Row className="g-4">
        <Col xs={12} md={6}>
          <div className="p-4 border rounded bg-light h-100">
            <div className="text-secondary mb-2">Monthly Savings</div>
            <div className="display-4 fw-bold text-success">
              {formatSavings(totalMonthlySavings)}
            </div>
          </div>
        </Col>

        <Col xs={12} md={6}>
          <div className="p-4 border rounded bg-light h-100">
            <div className="text-secondary mb-2">Annual Savings</div>
            <div className="display-4 fw-bold text-success">
              {formatSavings(totalAnnualSavings)}
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}
