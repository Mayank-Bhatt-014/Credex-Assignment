"use client";

import { Badge, Card, Col, Row } from "react-bootstrap";

const STATUS_VARIANTS = {
  optimal: "success",
  downgrade: "warning",
  remove: "danger",
  overpaying: "warning",
  upgrade: "primary",
};

function formatCurrency(value) {
  return `$${Number(value || 0).toLocaleString()}`;
}

function getBadgeVariant(status) {
  return STATUS_VARIANTS[status] || "secondary";
}

export default function ToolBreakdown({ recommendations }) {
  return (
    <Row className="g-4">
      {(recommendations || []).map((recommendation) => (
        <Col xs={12} md={6} key={`${recommendation.tool}-${recommendation.currentPlan}`}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                <Card.Title className="fw-bold mb-0">{recommendation.tool}</Card.Title>
                <Badge bg={getBadgeVariant(recommendation.status)}>
                  {recommendation.status}
                </Badge>
              </div>

              <div className="mb-3">
                <div>Current plan: {recommendation.currentPlan}</div>
                <div>Current spend: {formatCurrency(recommendation.currentSpend)}/month</div>
              </div>

              {recommendation.recommendedPlan && (
                <div className="mb-2">
                  Switch to {recommendation.recommendedPlan}
                </div>
              )}

              {recommendation.potentialSaving > 0 && (
                <div className="fw-bold text-success mb-2">
                  Save {formatCurrency(recommendation.potentialSaving)}/month
                </div>
              )}

              <Card.Text className="text-muted mb-0">{recommendation.reason}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
