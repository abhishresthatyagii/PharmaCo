import React from "react";
import { motion } from "framer-motion";

// 📌 Sample Pharma Articles & News
const articles = [
  {
    title: "Breakthrough in Cancer Drug Research",
    image: "/news/cancer-drug.jpg",
    category: "Research",
    summary:
      "Scientists at Bharat Biotech announced promising trial results for a new oral cancer treatment.",
  },
  {
    title: "Global Pharma Market Growth 2025",
    image: "/news/market-growth.jpg",
    category: "Industry",
    summary:
      "The global pharma industry is expected to grow by 12% in 2025, driven by biotech and generics.",
  },
  {
    title: "AI in Prescription Analysis",
    image: "/news/ai-healthcare.jpg",
    category: "Technology",
    summary:
      "AI tools are transforming how doctors analyze patient prescriptions and detect interactions.",
  },
  {
    title: "COVID-19 Vaccine Updates",
    image: "/news/vaccine.jpg",
    category: "Public Health",
    summary:
      "Ongoing trials show booster vaccines provide longer immunity with fewer side effects.",
  },
];

const PharmaArticles = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-green-50 to-white py-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-bold text-green-800 text-center mb-10">
          Pharma News & Research Insights
        </h2>

        {/* 📱 Articles - Swipe on mobile */}
        <div className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-6 snap-x snap-mandatory">
          {articles.map((article, idx) => (
            <motion.div
              key={idx}
              className="min-w-[260px] sm:min-w-[320px] bg-white border border-green-200 rounded-xl shadow-md overflow-hidden flex-shrink-0 snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <img
                src={article.image}
                alt={article.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 flex flex-col h-full">
                <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
                  {article.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 flex-grow">
                  {article.summary}
                </p>
                <button className="mt-3 px-4 py-2 bg-green-600 text-white text-sm rounded-lg shadow hover:bg-green-700 transition self-start">
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PharmaArticles;
