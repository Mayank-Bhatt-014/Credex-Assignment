"use client";

import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const INITIAL_FORM_STATE = {
  email: "",
  companyName: "",
  role: "",
  website: "",
};

export default function LeadCaptureModal({ show, onHide, auditId }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function updateField(field, value) {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));
  }

  function resetForm() {
    setFormData(INITIAL_FORM_STATE);
    setError("");
    setIsSubmitting(false);
  }

  function handleHide() {
    resetForm();
    onHide();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.website) {
      handleHide();
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          companyName: formData.companyName,
          role: formData.role,
          auditId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      handleHide();
    } catch {
      setError("Something went wrong, please try again");
      setIsSubmitting(false);
    }
  }

  return (
    <Modal show={show} onHide={handleHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Get this report in your inbox</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Form.Control
            type="text"
            name="website"
            value={formData.website}
            onChange={(event) => updateField("website", event.target.value)}
            className="d-none"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <Form.Group controlId="leadEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="leadCompanyName" className="mb-3">
            <Form.Label>Company name</Form.Label>
            <Form.Control
              type="text"
              value={formData.companyName}
              onChange={(event) => updateField("companyName", event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="leadRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={formData.role}
              onChange={(event) => updateField("role", event.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={handleHide}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send my report"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
