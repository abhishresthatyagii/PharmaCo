import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const alertsQueue = [
  {
    id: 1,
    title: "New Product Available!",
    productName: "Paracetamol 650mg",
    description: "Now available with WHO-GMP certification.",
    emoji: "💊",
    link: "/products",
  },
  {
    id: 2,
    title: "Doctor Sample Request",
    productName: "Amoxicillin Syrup",
    description: "Submit a quick request for free doctor samples.",
    emoji: "🧪",
    link: "/sample-request",
  },
];

const PharmaAlert = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", query: "" });

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setCurrentIndex(0);
    }, 8000); // start after 8s

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (currentIndex === null) return;

    const autoDismiss = setTimeout(() => {
      setCurrentIndex((prev) =>
        prev < alertsQueue.length - 1 ? prev + 1 : null
      );
    }, 10000); // stays 10s

    return () => clearTimeout(autoDismiss);
  }, [currentIndex]);

  const handleManualDismiss = () => {
    setCurrentIndex((prev) =>
      prev < alertsQueue.length - 1 ? prev + 1 : null
    );
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Query Submitted!\n${JSON.stringify(formData, null, 2)}`);
    setFormData({ name: "", email: "", query: "" });
    handleManualDismiss();
  };

  const currentAlert = alertsQueue[currentIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {currentAlert && (
          <motion.div
            key={currentAlert.id}
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white/90 backdrop-blur-md border border-green-100 shadow-2xl rounded-xl p-5 w-[340px] text-sm font-poppins"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">{currentAlert.emoji}</div>
              <div className="flex-1">
                <h3 className="font-bold text-green-800 mb-1">
                  {currentAlert.title}
                </h3>
                <h4 className="text-green-600 font-semibold">
                  {currentAlert.productName}
                </h4>
                <p className="text-gray-600 text-xs mb-3">
                  {currentAlert.description}
                </p>

                {/* Query Form */}
                <form onSubmit={handleSubmit} className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-200 rounded-md text-xs"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-200 rounded-md text-xs"
                    required
                  />
                  <textarea
                    name="query"
                    placeholder="Your Query"
                    rows={2}
                    value={formData.query}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-200 rounded-md text-xs"
                    required
                  />
                  <div className="flex justify-between items-center pt-1">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700 transition"
                    >
                      Submit
                    </button>
                    <button
                      onClick={handleManualDismiss}
                      type="button"
                      className="text-gray-500 text-xs hover:text-red-500"
                    >
                      Dismiss
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PharmaAlert;
