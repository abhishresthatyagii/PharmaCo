import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Upload, BrainCircuit, Search } from "lucide-react";
import CountUp from "react-countup";

// Text fade animation
const textFade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      type: "spring",
      stiffness: 80,
    },
  }),
};

// Floating molecular cluster (unchanged)
const MolecularCluster = ({ top, left, scale = 1, delay = 0, color = "text-emerald-500", hideOnMobile = false }) => {
  const nodes = [
    { cx: 40, cy: 60, r: 5 },
    { cx: 100, cy: 30, r: 4 },
    { cx: 160, cy: 80, r: 6 },
    { cx: 220, cy: 40, r: 5 },
    { cx: 280, cy: 70, r: 4 },
  ];

  return (
    <motion.svg
      className={`absolute opacity-40 ${color} ${hideOnMobile ? "hidden sm:block" : ""}`}
      style={{ top, left, transform: `scale(${scale})` }}
      viewBox="0 0 300 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <motion.g
        stroke="currentColor"
        strokeWidth="1.2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="40" y1="60" x2="100" y2="30" />
        <line x1="100" y1="30" x2="160" y2="80" />
        <line x1="160" y1="80" x2="220" y2="40" />
        <line x1="220" y1="40" x2="280" y2="70" />
      </motion.g>

      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill="currentColor"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            delay: i * 0.4,
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.svg>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("initial");
  const fileInputRef = useRef(null);

  // Phase animation
  useEffect(() => {
    const splitTimer = setTimeout(() => setPhase("split"), 2000);
    const mergeTimer = setTimeout(() => setPhase("merge"), 4000);
    const finalTimer = setTimeout(() => setPhase("final"), 5500);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(mergeTimer);
      clearTimeout(finalTimer);
    };
  }, []);

  // Handle Upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      alert(`AI Extracted Text: ${result.text}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed, please try again.");
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-tr from-white via-green-50 to-white flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 pt-20 sm:pt-24">
      {/* 🔹 Background Blobs */}
      <div className="absolute w-60 sm:w-80 h-60 sm:h-80 bg-green-100 rounded-full blur-3xl opacity-30 top-10 left-5 sm:left-10 z-0" />
      <div className="absolute w-60 sm:w-80 h-60 sm:h-80 bg-green-200 rounded-full blur-2xl opacity-20 bottom-10 right-5 sm:right-10 z-0" />

      {/* 🔹 Floating Molecules */}
      <MolecularCluster top="12%" left="8%" scale={1.1} delay={0.2} color="text-emerald-500" />
      <MolecularCluster top="25%" left="70%" scale={1} delay={0.6} color="text-teal-500" hideOnMobile />
      <MolecularCluster top="55%" left="18%" scale={1.2} delay={1} color="text-cyan-500" />
      <MolecularCluster top="75%" left="80%" scale={0.9} delay={1.4} color="text-emerald-400" hideOnMobile />

      {/* 🔹 Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto text-center px-2 sm:px-6 md:px-8">
        <motion.h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-900"
          variants={textFade}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Empowering Health
        </motion.h1>

        <motion.h2
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-600 mt-2"
          variants={textFade}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Globally
        </motion.h2>

        <motion.p
          className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-800 max-w-sm sm:max-w-xl px-2"
          variants={textFade}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          PharmaCo delivers innovative, high-quality, and affordable
          pharmaceuticals with global distribution and 20+ years of trust.
        </motion.p>

        {/* 🔹 CTA Button Phases (unchanged) */}
        <motion.div
          className="mt-8 sm:mt-10 relative w-full sm:w-auto min-h-[50px] sm:min-h-[56px] flex justify-center items-center"
          variants={textFade}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {phase === "initial" && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white text-sm sm:text-lg font-semibold rounded-full shadow-lg"
            >
              Explore Products
            </motion.button>
          )}
          {phase === "split" && (
            <>
              <motion.div
                className="absolute -translate-x-full px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white font-semibold text-sm sm:text-lg rounded-l-full shadow-lg z-10"
                initial={{ x: 0, rotate: 0, opacity: 0 }}
                animate={{ x: "-80px", rotate: -12, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
              >
                Explore
              </motion.div>
              <motion.div
                className="absolute px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white font-semibold text-sm sm:text-lg rounded-r-full shadow-lg z-10"
                initial={{ x: 0, rotate: 0, opacity: 0 }}
                animate={{ x: "80px", rotate: 12, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              >
                Products
              </motion.div>
            </>
          )}
          {phase === "merge" && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-sm sm:text-lg font-semibold rounded-full shadow-lg"
            >
              Explore Products
            </motion.button>
          )}
          {phase === "final" && (
            <motion.button
              onClick={() => navigate("/products")}
              whileHover={{ scale: 1.05 }}
              aria-label="Explore Products"
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-sm sm:text-lg font-semibold rounded-full shadow-lg relative overflow-hidden transition-all duration-300 animate-pulseGlow"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Products <FiArrowRight />
              </span>
              <span className="absolute top-0 left-[-75%] w-[200%] h-full bg-white/10 blur-[1px] transform skew-x-[-20deg] animate-shine" />
            </motion.button>
          )}
        </motion.div>

        {/* 🔹 New Cards (replace trust signals) */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 w-full max-w-4xl">
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*,.pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Card 1 */}
          <div
            onClick={() => fileInputRef.current.click()}
            className="cursor-pointer p-6 rounded-2xl bg-green-50 shadow-md hover:shadow-xl transition border border-green-200"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 text-green-600 mb-4">
              <Upload size={28} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Upload & Analyze</h3>
            <p className="text-gray-600 text-sm mt-2">
              Securely upload prescriptions or reports and let AI extract and analyze data for you.
            </p>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate("/features")}
            className="cursor-pointer p-6 rounded-2xl bg-green-50 shadow-md hover:shadow-xl transition border border-green-200"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 text-green-600 mb-4">
              <BrainCircuit size={28} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">AI Recommendations</h3>
            <p className="text-gray-600 text-sm mt-2">
              Get medicine suggestions, interactions, and dosage checks powered by AI.
            </p>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate("/search")}
            className="cursor-pointer p-6 rounded-2xl bg-green-50 shadow-md hover:shadow-xl transition border border-green-200"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-green-100 text-green-600 mb-4">
              <Search size={28} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Smart Search</h3>
            <p className="text-gray-600 text-sm mt-2">
              Search through medicines, companies, and reports with advanced AI filters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
