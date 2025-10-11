import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const certificates = [
  { id: 1, name: "FDA Compliance", image: "/certificates/fda.png" },
  { id: 2, name: "ISO 9001:2015", image: "/certificates/ISO.png" },
  { id: 3, name: "WHO-GMP Certificate", image: "/certificates/who-gmp.png" },
  { id: 4, name: "DCGI Approval", image: "/certificates/DGCI.png" },
];

const CertificateCarousel = () => {
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      controls.start({
        x: ["0%", "-50%"],
        transition: { repeat: Infinity, duration: 25, ease: "linear" },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls]);

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-tr from-white via-green-50 to-white overflow-hidden">
      {/* Background animated circles */}
      <motion.div
        className="absolute w-48 h-48 bg-green-100 rounded-full blur-3xl opacity-20 top-16 left-20 z-0"
        animate={{ y: [0, 20, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-60 h-60 bg-green-200 rounded-full blur-2xl opacity-15 bottom-16 right-16 z-0"
        animate={{ y: [0, -20, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-green-300 rounded-full blur-3xl opacity-10 top-1/2 left-1/3 z-0"
        animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-6"
        >
          Our Certifications & Licenses
        </motion.h2>

        <p className="text-base sm:text-lg text-gray-600 mb-14 max-w-2xl mx-auto">
          PharmaCo is certified by global and national agencies for quality and regulatory compliance.
        </p>

        {/* Carousel Section */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div className="flex gap-8 sm:gap-10" animate={controls}>
            {[...certificates, ...certificates].map((cert, index) => (
              <motion.div
                key={index}
                className="min-w-[200px] sm:min-w-[240px] md:min-w-[260px] bg-white border border-green-100 shadow-md rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center"
                whileHover={{
                  scale: 1.08,
                  rotateZ: [0, 2, -2, 0],
                  y: -5,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-full h-32 sm:h-40 md:h-44">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="text-green-800 font-semibold text-sm sm:text-base mt-4">
                  {cert.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificateCarousel;
