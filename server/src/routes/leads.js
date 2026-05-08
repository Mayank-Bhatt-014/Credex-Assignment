import express from "express";
import Audit from "../models/Audit.js";
import Lead from "../models/Lead.js";
import { leadLimiter } from "../middleware/rateLimiter.js";
import { sendAuditEmail } from "../services/emailService.js";

const router = express.Router();

router.post("/", leadLimiter, async (req, res) => {
  const { email, companyName, role, auditId } = req.body || {};

  if (!email || !auditId) {
    return res.status(400).json({ error: "email and auditId are required" });
  }

  try {
    const existingLead = await Lead.findOne({ email: email.toLowerCase().trim(), auditId });

    if (existingLead) {
      return res.json({ success: true, duplicate: true });
    }

    await Lead.create({
      email,
      companyName,
      role,
      auditId,
    });

    const audit = await Audit.findOne({ auditId });

    await sendAuditEmail(email, audit?.auditResult, auditId);

    return res.json({ success: true });
  } catch {
    return res.status(500).json({ error: "Failed to save lead" });
  }
});

export default router;
