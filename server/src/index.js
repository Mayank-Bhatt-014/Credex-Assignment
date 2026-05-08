import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import auditRouter from "./routes/audit.js";
import leadsRouter from "./routes/leads.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);

app.use("/api/audit", auditRouter);
app.use("/api/leads", leadsRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

export default app;
