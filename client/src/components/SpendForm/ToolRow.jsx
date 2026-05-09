"use client";

import { Col, Form, Row } from "react-bootstrap";

export default function ToolRow({ tool, onChange, pricingData }) {
  const planOptions = Object.keys(pricingData?.[tool.name]?.plans || {});
  const isDisabled = !tool.active;

  function updateTool(field, value) {
    onChange({
      ...tool,
      [field]: value,
    });
  }

  return (
    <Row className="align-items-center g-3 py-2 border-bottom">
      <Col xs={12} md={1}>
        <Form.Check
          type="checkbox"
          checked={tool.active}
          onChange={(event) => updateTool("active", event.target.checked)}
          aria-label={`Activate ${tool.name}`}
        />
      </Col>

      <Col xs={12} md={3}>
        <div className={isDisabled ? "text-secondary" : ""}>{tool.name}</div>
      </Col>

      <Col xs={12} md={3}>
        <Form.Select
          value={tool.plan}
          disabled={isDisabled}
          onChange={(event) => updateTool("plan", event.target.value)}
          aria-label={`${tool.name} plan`}
        >
          {planOptions.map((planName) => (
            <option key={planName} value={planName}>
              {planName}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col xs={12} md={2}>
        <Form.Control
          type="number"
          min="0"
          value={tool.seats}
          disabled={isDisabled}
          onChange={(event) => updateTool("seats", Number(event.target.value))}
          aria-label={`${tool.name} seats`}
        />
      </Col>

      <Col xs={12} md={3}>
        <Form.Control
          type="number"
          min="0"
          step="0.01"
          value={tool.monthlySpend}
          disabled={isDisabled}
          onChange={(event) => updateTool("monthlySpend", Number(event.target.value))}
          aria-label={`${tool.name} monthly spend`}
        />
      </Col>
    </Row>
  );
}
