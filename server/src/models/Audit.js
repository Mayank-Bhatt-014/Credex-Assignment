import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema({
  auditId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  formData: {
    type: Object,
    required: true,
  },
  auditResult: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Audit", AuditSchema);
