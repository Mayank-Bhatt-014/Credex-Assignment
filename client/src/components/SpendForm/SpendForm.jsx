"use client";

import { useRouter } from "next/navigation";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useFormPersistence from "../../hooks/useFormPersistence.js";
import { runAudit } from "../../lib/auditEngine.js";
import { PRICING_DATA, USE_CASES } from "../../lib/pricingData.js";
import ToolRow from "./ToolRow.jsx";

const AUDIT_RESULT_KEY = "credex_audit_result";
const AUDIT_ID_KEY = "credex_audit_id";

function createAuditId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function SpendForm() {
  const router = useRouter();
  const [formData, setFormData] = useFormPersistence();

  function updateTool(updatedTool, index) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      tools: currentFormData.tools.map((tool, toolIndex) =>
        toolIndex === index ? updatedTool : tool
      ),
    }));
  }

  function updateFormField(field, value) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const auditResult = runAudit(formData);
    const auditId = createAuditId();

    window.localStorage.setItem(AUDIT_RESULT_KEY, JSON.stringify(auditResult));
    window.localStorage.setItem(AUDIT_ID_KEY, auditId);

    try {
      const response = await fetch(`${API_URL}/api/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId, formData, auditResult }),
      });

      if (!response.ok) {
        throw new Error("Failed to save audit to backend");
      }
    } catch (error) {
      console.error("Failed to save audit to backend:", error);
    }

    router.push(`/audit/${auditId}`);
  }

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <h2 className="mb-4">Audit Your AI Spend</h2>

          <Row className="g-3 small text-muted border-bottom pb-2 mb-1">
            <Col xs={12} md={1} />
            <Col xs={12} md={3}>
              Tool
            </Col>
            <Col xs={12} md={3}>
              Plan
            </Col>
            <Col xs={12} md={2}>
              Seats
            </Col>
            <Col xs={12} md={3}>
              Monthly Spend ($)
            </Col>
          </Row>

          <div className="mb-4">
            {formData.tools.map((tool, index) => (
              <ToolRow
                key={tool.name}
                tool={tool}
                onChange={(updatedTool) => updateTool(updatedTool, index)}
                pricingData={PRICING_DATA}
              />
            ))}
          </div>

          <Row className="g-3 align-items-end">
            <Col xs={12} md={4}>
              <Form.Group controlId="teamSize">
                <Form.Label>Team size</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={formData.teamSize}
                  onChange={(event) => updateFormField("teamSize", Number(event.target.value))}
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="useCase">
                <Form.Label>Primary use case</Form.Label>
                <Form.Select
                  value={formData.useCase}
                  onChange={(event) => updateFormField("useCase", event.target.value)}
                >
                  {USE_CASES.map((useCase) => (
                    <option key={useCase.value} value={useCase.value}>
                      {useCase.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Button type="submit" variant="primary" size="lg" className="w-100">
                Run Audit
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
