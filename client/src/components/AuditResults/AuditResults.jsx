"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Alert, Button, Spinner } from "react-bootstrap";
import LeadCaptureModal from "../LeadCapture/LeadCaptureModal.jsx";
import SavingsHero from "./SavingsHero.jsx";
import ToolBreakdown from "./ToolBreakdown.jsx";

const AUDIT_RESULT_KEY = "credex_audit_result";
const AUDIT_ID_KEY = "credex_audit_id";

function getFallbackSummary(totalMonthlySavings) {
  return `Based on your audit, you could save $${Number(
    totalMonthlySavings || 0
  ).toLocaleString()}/month by optimising your AI tool subscriptions.`;
}

export default function AuditResults() {
  const [auditResult, setAuditResult] = useState(null);
  const [auditId, setAuditId] = useState("");
  const [hasLoadedAudit, setHasLoadedAudit] = useState(false);
  const [summary, setSummary] = useState("");
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const savedAuditResult = window.localStorage.getItem(AUDIT_RESULT_KEY);
        const savedAuditId = window.localStorage.getItem(AUDIT_ID_KEY);

        if (savedAuditResult) {
          setAuditResult(JSON.parse(savedAuditResult));
        }

        if (savedAuditId) {
          setAuditId(savedAuditId);
        }
      } catch {
        setAuditResult(null);
      } finally {
        setHasLoadedAudit(true);
      }
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedAudit || !auditResult || !auditId) {
      return;
    }

    let shouldIgnore = false;

    async function loadSummary() {
      setIsSummaryLoading(true);

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${API_URL}/api/audit/${encodeURIComponent(auditId)}`);

        if (!response.ok) {
          throw new Error("Summary request failed");
        }

        const data = await response.json();

        if (!shouldIgnore) {
          setSummary(data.summary || getFallbackSummary(auditResult.totalMonthlySavings));
        }
      } catch {
        if (!shouldIgnore) {
          setSummary(getFallbackSummary(auditResult.totalMonthlySavings));
        }
      } finally {
        if (!shouldIgnore) {
          setIsSummaryLoading(false);
        }
      }
    }

    loadSummary();

    return () => {
      shouldIgnore = true;
    };
  }, [auditId, auditResult, hasLoadedAudit]);

  async function copyShareUrl() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  if (!hasLoadedAudit) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (!auditResult) {
    return (
      <Alert variant="warning">
        No audit found. <Link href="/">Run a new audit</Link>
      </Alert>
    );
  }

  return (
    <>
      <SavingsHero
        totalMonthlySavings={auditResult.totalMonthlySavings}
        totalAnnualSavings={auditResult.totalAnnualSavings}
        isOptimal={auditResult.isOptimal}
      />

      <section className="mb-5">
        <h2 className="mb-4">Your Tool Breakdown</h2>
        <ToolBreakdown recommendations={auditResult.recommendations} />
      </section>

      <section className="mb-5">
        <h2 className="mb-3">Your Personalised Summary</h2>
        {isSummaryLoading ? (
          <div className="d-flex align-items-center gap-2">
            <Spinner animation="border" size="sm" role="status" />
            <span>Loading summary...</span>
          </div>
        ) : (
          <p className="lead mb-0">{summary}</p>
        )}
      </section>

      <section className="mb-5">
        <Button variant="primary" onClick={() => setShowLeadCapture(true)}>
          Get this report in your inbox
        </Button>
      </section>

      <section className="mb-5">
        <h2 className="mb-3">Share your audit</h2>
        <Button type="button" variant="outline-primary" onClick={copyShareUrl}>
          {copied ? "Copied!" : "Copy share link"}
        </Button>
      </section>

      <LeadCaptureModal
        show={showLeadCapture}
        onHide={() => setShowLeadCapture(false)}
        auditId={auditId}
      />
    </>
  );
}
