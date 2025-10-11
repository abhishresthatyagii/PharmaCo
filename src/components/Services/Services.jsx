import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";

// Slide-in animation
const SlideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { delay, duration: 0.5 } },
});

// Overlay animation
const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// Services trust signals
const ServicesData = [
  {
    id: 1,
    icon: "💊",
    title: "600+ Formulations",
    description: "We offer 600+ trusted and certified pharma formulations globally.",
    delay: 0,
  },
  {
    id: 2,
    icon: "🧪",
    title: "WHO-GMP Certified",
    description: "World Health Organization GMP certified, ensuring top quality & safety.",
    delay: 0.1,
  },
  {
    id: 3,
    icon: "⏳",
    title: "43+ Years Experience",
    description: "Over four decades of pharmaceutical expertise and innovation.",
    delay: 0.2,
  },
  {
    id: 4,
    icon: "🚚",
    title: "Global Distribution",
    description: "Robust global logistics to deliver life-saving medicines worldwide.",
    delay: 0.3,
  },
  {
    id: 5,
    icon: "🔬",
    title: "R&D Excellence",
    description: "Cutting-edge research & development for future-ready solutions.",
    delay: 0.4,
  },
  {
    id: 6,
    icon: "🤝",
    title: "Trusted Partnerships",
    description: "Partnering with leading institutions & brands for a healthier tomorrow.",
    delay: 0.5,
  },
];

// Magnetic button
const MagneticButton = ({ children, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useTransform(x, [-30, 30], [1.05, 1.05]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.4);
    y.set(offsetY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y, scale }}
      className="px-5 py-2 text-sm sm:text-base bg-gradient-to-r from-green-600 to-emerald-400 text-white font-semibold rounded-full shadow-md transition-colors duration-300"
    >
      {children}
    </motion.button>
  );
};

const Services = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const isAnyHovered = hoveredId !== null;

  const handleConnectClick = () => {
    alert("Thank you! Our PharmaCo experts will connect with you soon.");
  };

  return (
    <section className="relative w-full bg-gradient-to-tr from-white via-green-50 to-white overflow-hidden px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
      {/* 💚 Hero-style Blobs */}
      <div className="absolute w-64 xs:w-72 h-64 bg-green-100 rounded-full blur-3xl opacity-30 top-10 left-10 z-0" />
      <div className="absolute w-60 xs:w-72 h-60 bg-green-200 rounded-full blur-2xl opacity-20 bottom-10 right-10 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-left pb-10 text-[#14532d]">
          Why Choose PharmaCo?
        </h1>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
          {ServicesData.map((service) => {
            const isHovered = hoveredId === service.id;

            return (
              <motion.div
                key={service.id}
                variants={SlideLeft(service.delay)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative rounded-xl overflow-hidden cursor-pointer border
                  bg-white border-green-100 shadow-sm
                  transition-all duration-300 min-h-[150px] sm:min-h-[180px] px-3 py-4
                  ${
                    isHovered
                      ? "scale-105 shadow-lg bg-[#e6f4ea] border-green-300"
                      : ""
                  }
                  ${
                    isAnyHovered && !isHovered
                      ? "opacity-70 scale-95"
                      : "opacity-100 scale-100"
                  }
                `}
              >
                {/* Normal View */}
                <div
                  className={`flex flex-col items-center justify-center h-full transition-opacity duration-200 text-[#1c4532] ${
                    isHovered ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="text-2xl sm:text-3xl mb-3">{service.icon}</div>
                  <h2 className="text-xs sm:text-sm font-semibold text-center px-2">
                    {service.title}
                  </h2>
                </div>

                {/* Hover Overlay */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-green-800 text-white flex flex-col justify-center items-center px-4 text-center z-10 rounded-xl"
                      variants={overlayVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <p className="text-xs sm:text-sm mb-4 max-w-[180px] sm:max-w-[200px]">
                        {service.description}
                      </p>
                      <MagneticButton
                        onClick={
                          service.id === 6 ? handleConnectClick : undefined
                        }
                      >
                        {service.id === 6 ? "Connect Us" : "Discover More"}
                      </MagneticButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
