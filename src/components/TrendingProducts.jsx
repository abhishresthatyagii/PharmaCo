import React, { useState } from "react";
import { motion } from "framer-motion";

const trendingProducts = [
  { name: "Calcium", image: "/Medicines/Calcium.png", description: "Effective for pain and fever relief." },
  { name: "Paracetamol 500mg", image: "/Medicines/Paracetamol.png", description: "Effective for pain and fever relief." },
  { name: "Amoxicillin 250mg", image: "/Medicines/Amoxicilin.png", description: "Broad spectrum antibiotic for bacterial infections." },
  { name: "Cetirizine 10mg", image: "/Medicines/Cetirizine.png", description: "Used for allergy symptoms." },
  { name: "Ibuprofen 40mg", image: "/Medicines/lbuprofen40mg.png", description: "Anti-inflammatory and pain reliever." },
  { name: "Azithromycin 500mg", image: "/Medicines/Azithromycin.png", description: "Antibiotic for respiratory infections." },
  { name: "Pantoprazole 40mg", image: "/Medicines/Pantaprazole.png", description: "Treats acid reflux and ulcers." },
  { name: "Dolo 650mg", image: "/Medicines/dolo650.png", description: "Pain and fever reducer." },
  { name: "Metformin 500mg", image: "/Medicines/Metformin.png", description: "Used for managing diabetes." },
  { name: "Losartan 500mg", image: "/Medicines/Losartan500.png", description: "Treats high blood pressure." },
  { name: "Vitamin C 500mg", image: "/Medicines/Vitaminc.png", description: "Boosts immunity and health." },
];

const TrendingProducts = () => {
  const [showAll, setShowAll] = useState(false);
  const productsToShow = showAll ? trendingProducts : trendingProducts.slice(0, 8);

  return (
    <section className="relative bg-gradient-to-br from-white via-green-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title & Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-3 sm:mb-0">
            Trending Pharma Products
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-green-700 hover:bg-green-800 text-white text-sm sm:text-base font-medium px-4 py-2 rounded-lg shadow transition-colors"
          >
            {showAll ? "Show Less" : "Explore All"}
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {productsToShow.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-green-100 shadow-sm p-3 sm:p-4 flex flex-col items-center hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              {/* Image */}
              <div className="w-full h-40 sm:h-48 mb-3 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Details */}
              <h4 className="text-sm sm:text-base font-semibold text-green-800 text-center line-clamp-1">
                {product.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 text-center line-clamp-2">
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
