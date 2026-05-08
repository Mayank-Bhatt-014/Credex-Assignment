import rateLimit from "express-rate-limit";

export const auditLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many audits, please try again later",
});

export const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many submissions, please try again later",
});
