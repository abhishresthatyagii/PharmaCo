import express from "express";
import multer from "multer";

const router = express.Router();

// Configure file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload and analyze prescription
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Here you can integrate OpenAI vision API in real scenario.
    const fakeAIResult = {
      detectedMedicines: [
        { name: "Paracetamol 500mg", confidence: 0.98 },
        { name: "Cetirizine 10mg", confidence: 0.94 },
      ],
      recommendations: [
        { name: "Dolo 650mg", reason: "Cheaper alternative", price: 45 },
        { name: "Loratadine 10mg", reason: "Allergy alternative", price: 35 },
      ],
      sideEffects: [
        { medicine: "Paracetamol 500mg", alerts: ["Avoid overdose >4g/day"] },
      ],
    };

    res.json({ success: true, data: fakeAIResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "AI analysis failed" });
  }
});

export default router;
