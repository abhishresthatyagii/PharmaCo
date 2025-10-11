import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, AlertTriangle, XCircle, Brain } from "lucide-react";

export default function FuturisticAIPharmaHero() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [symptomText, setSymptomText] = useState("");
  const [symptomResult, setSymptomResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate AI scan for uploaded prescription
  const simulateAiScan = (file) => {
    setIsProcessing(true);
    setAiResults(null);
    setAlerts([]);
    setTimeout(() => {
      const detected = {
        detectedMedicines: [
          { name: "Paracetamol 500mg", confidence: 0.98 },
          { name: "Cetirizine 10mg", confidence: 0.95 },
        ],
        recommendations: [
          { name: "Dolo 650mg", reason: "Generic / Cheaper", price: 45 },
          { name: "Loratadine 10mg", reason: "Allergy alternative", price: 35 },
        ],
        sideEffects: [
          { medicine: "Paracetamol 500mg", alerts: ["Overdose risk >4g/day"] },
        ],
      };
      setIsProcessing(false);
      setAiResults(detected);
      setAlerts(
        detected.sideEffects.flatMap((s) =>
          s.alerts.map((a) => ({ id: Math.random(), text: `${s.medicine}: ${a}` }))
        )
      );
    }, 1800);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFile(file.name);
    await simulateAiScan(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setAiResults(null);
    setAlerts([]);
  };

  const dismissAlert = (id) => setAlerts((a) => a.filter((x) => x.id !== id));

  // Simulated GPT-based symptom analyzer
  const handleSymptomAnalyze = () => {
    if (!symptomText.trim()) return;
    setIsAnalyzing(true);
    setSymptomResult(null);

    setTimeout(() => {
      let prediction = "General Infection";
      let medicines = ["Azithromycin 500mg", "Paracetamol 650mg", "ORS Solution"];
      let advice = "Stay hydrated and consult a doctor if fever persists for more than 3 days.";

      const txt = symptomText.toLowerCase();
      if (txt.includes("cough") || txt.includes("cold")) {
        prediction = "Common Cold or Mild Flu";
        medicines = ["Cetirizine 10mg", "Steam Inhalation", "Dolo 650mg"];
        advice = "Take rest, avoid cold drinks, and maintain room humidity.";
      } else if (txt.includes("headache")) {
        prediction = "Migraine or Stress Headache";
        medicines = ["Paracetamol 650mg", "Caffeine tablets", "Adequate hydration"];
        advice = "Avoid bright lights and reduce screen time.";
      } else if (txt.includes("stomach") || txt.includes("vomit")) {
        prediction = "Gastric Infection";
        medicines = ["Pantoprazole 40mg", "Domperidone 10mg", "ORS Solution"];
        advice = "Avoid spicy foods and drink clean water.";
      }

      setSymptomResult({ prediction, medicines, advice });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute w-72 h-72 bg-green-300 rounded-full filter blur-3xl opacity-40 top-10 left-10"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-green-200 rounded-full filter blur-2xl opacity-30 bottom-10 right-10"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center gap-12">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 leading-tight">
            Futuristic AI ePharmacy
          </h1>
          <p className="mt-6 text-gray-700 text-lg">
            Upload prescriptions or describe your symptoms — our AI detects medicines, predicts illnesses, and provides smarter, safer alternatives.
          </p>
        </motion.div>

        {/* Dual Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
          {/* LEFT PANEL - Prescription Upload */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-green-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-green-800 text-lg">Prescription Scanner</h3>
              {uploadedFile && (
                <button
                  onClick={removeFile}
                  className="flex items-center gap-1 text-xs text-red-500 hover:underline"
                >
                  <XCircle size={14} /> Remove
                </button>
              )}
            </div>

            <input
              id="pres-upload"
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onClick={() => document.getElementById("pres-upload").click()}
              className="h-52 bg-gradient-to-r from-green-50 via-white to-green-50 border border-dashed border-green-300 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer relative overflow-hidden"
            >
              {isProcessing ? (
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-green-500"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                />
              ) : (
                <>
                  <Upload size={28} className="text-green-700 mb-2" />
                  <p className="text-sm">{uploadedFile ? uploadedFile : "Click to upload prescription"}</p>
                </>
              )}
            </div>

            <AnimatePresence>
              {aiResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4"
                >
                  <h4 className="font-semibold text-green-800">Detected Medicines</h4>
                  <ul className="text-sm text-gray-700 list-disc ml-5 mt-2">
                    {aiResults.detectedMedicines.map((m, i) => (
                      <li key={i}>
                        {m.name} ({(m.confidence * 100).toFixed(0)}%)
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-green-800 mt-3">Recommendations</h4>
                  <ul className="text-sm text-gray-700 list-disc ml-5 mt-2">
                    {aiResults.recommendations.map((m, i) => (
                      <li key={i}>
                        {m.name} — {m.reason} (₹{m.price})
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Alerts */}
            <div className="space-y-2 mt-4">
              {alerts.map((al) => (
                <motion.div
                  key={al.id}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700"
                >
                  <AlertTriangle className="text-red-500" />
                  <div className="text-sm">{al.text}</div>
                  <button
                    onClick={() => dismissAlert(al.id)}
                    className="ml-auto text-xs text-red-500 hover:underline"
                  >
                    Dismiss
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT PANEL - Symptom Analyzer */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-green-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="text-green-700" />
              <h3 className="font-semibold text-green-800 text-lg">AI Symptom Analyzer</h3>
            </div>

            <textarea
              className="w-full border border-green-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-green-400"
              rows="4"
              placeholder="Describe your illness, symptoms, or condition..."
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
            ></textarea>

            <button
              onClick={handleSymptomAnalyze}
              className="mt-4 w-full bg-green-700 text-white rounded-xl py-2 hover:scale-[1.02] transition-transform"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Symptoms"}
            </button>

            {symptomResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4"
              >
                <h4 className="font-semibold text-green-800">
                  Possible Condition: {symptomResult.prediction}
                </h4>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Suggested Medicines:</strong> {symptomResult.medicines.join(", ")}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Advice:</strong> {symptomResult.advice}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
