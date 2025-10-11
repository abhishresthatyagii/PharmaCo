import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prescriptionRoute from "./routes/prescription.js";
import symptomRoute from "./routes/symptoms.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/prescription", prescriptionRoute);
app.use("/api/symptoms", symptomRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ AI Pharma backend running on port ${PORT}`));
