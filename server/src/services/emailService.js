import { Resend } from "resend";

function formatCurrency(value) {
  return `$${Number(value || 0).toLocaleString()}`;
}

function buildAuditUrl(auditId) {
  const frontendUrl = process.env.FRONTEND_URL || "";
  return `${frontendUrl.replace(/\/$/, "")}/audit/${auditId}`;
}

export async function sendAuditEmail(email, auditResult, auditId) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error("Email not sent: RESEND_API_KEY or FROM_EMAIL is missing.");
    return;
  }

  const resend = new Resend(apiKey);
  const auditUrl = buildAuditUrl(auditId);
  const totalMonthlySavings = Number(auditResult?.totalMonthlySavings || 0);
  const totalAnnualSavings = Number(auditResult?.totalAnnualSavings || 0);

  const consultationHtml =
    totalMonthlySavings > 500
      ? '<p>Book a free Credex consultation at <a href="https://credex.rocks">https://credex.rocks</a>.</p>'
      : "";

  try {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Your AI Spend Audit Report - Credex",
      html: `
        <p>Thank you for using the Credex AI Spend Audit tool.</p>
        <p>Your estimated monthly savings: <strong>${formatCurrency(
          totalMonthlySavings
        )}</strong></p>
        <p>Your estimated annual savings: <strong>${formatCurrency(
          totalAnnualSavings
        )}</strong></p>
        ${consultationHtml}
        <p>View your audit here: <a href="${auditUrl}">${auditUrl}</a></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send audit email:", error);
  }
}
