import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const tabs = [
  { label: "About PharmaCo", id: "about" },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("about");

  // Hook for animated button movement
  const createMotionButtonProps = () => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useSpring(1, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e) => {
      const rect = ref.current?.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      x.set(offsetX * 0.2);
      y.set(offsetY * 0.2);
      scale.set(1.05);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      scale.set(1);
    };

    return { ref, x, y, scale, handleMouseMove, handleMouseLeave };
  };

  return (
    <div className="min-h-screen bg-[#e9fdf1] pt-24 pb-12 px-4 sm:px-6 lg:px-20">
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center mb-10 text-[#145c3e]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About PharmaCo
      </motion.h2>

      {/* Animated Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {tabs.map((tab) => {
          const { ref, x, y, scale, handleMouseMove, handleMouseLeave } =
            createMotionButtonProps();

          return (
            <motion.button
              key={tab.id}
              ref={ref}
              onClick={() => setActiveTab(tab.id)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x, y, scale }}
              className={`px-6 py-2 font-semibold rounded-full transition-colors duration-300 
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md"
                    : "bg-green-100 text-[#155c47]"
                }`}
            >
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "about" && (
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md text-[#155c47] max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-[#0e8f61]">
            Who We Are
          </h3>
          <p className="mb-4 leading-relaxed text-lg">
            <strong>PharmaCo</strong> is a globally trusted pharmaceutical manufacturer delivering
            WHO-GMP certified formulations across 20+ countries. Our mission is to empower healthcare providers
            with innovative, reliable, and accessible medical solutions.
          </p>

          <h4 className="text-xl font-semibold mb-3 mt-6">💊 What We Offer</h4>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li>600+ DCGI approved formulations</li>
            <li>Third-party manufacturing services</li>
            <li>Export-grade production for 22 countries</li>
            <li>Customized PCD Franchise opportunities</li>
            <li>WHO-GMP, ISO-certified facilities</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3 mt-6">🌿 Our Vision</h4>
          <p>
            To become the most respected name in global pharmaceutical manufacturing
            by delivering exceptional quality and consistent innovation.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default About;
