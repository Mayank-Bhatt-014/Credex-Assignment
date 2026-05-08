import express from "express";
import Audit from "../models/Audit.js";
import { auditLimiter } from "../middleware/rateLimiter.js";
import { generateSummary } from "../services/anthropicService.js";

const router = express.Router();

router.post("/", auditLimiter, async (req, res) => {
  const { auditId, formData, auditResult } = req.body || {};

  if (!auditId || !formData || !auditResult) {
    return res.status(400).json({ error: "auditId, formData, and auditResult are required" });
  }

  try {
    const existingAudit = await Audit.findOne({ auditId });

    if (existingAudit) {
      return res.json({ success: true, auditId: existingAudit.auditId });
    }

    await Audit.create({
      auditId,
      formData,
      auditResult,
    });

    return res.json({ success: true, auditId });
  } catch (error) {
    if (error?.code === 11000) {
      const existingAudit = await Audit.findOne({ auditId });

      if (existingAudit) {
        return res.json({ success: true, auditId: existingAudit.auditId });
      }
    }

    return res.status(500).json({ error: "Failed to save audit" });
  }
});

router.get("/:auditId", async (req, res) => {
  try {
    const audit = await Audit.findOne({ auditId: req.params.auditId });

    if (!audit) {
      return res.status(404).json({ error: "Audit not found" });
    }

    const summary = await generateSummary(audit.auditResult);

    return res.json({
      auditId: audit.auditId,
      auditResult: audit.auditResult,
      summary,
    });
  } catch {
    return res.status(500).json({ error: "Failed to load audit" });
  }
});

export default router;
