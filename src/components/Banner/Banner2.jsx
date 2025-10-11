import React, { useState } from "react";
import { motion } from "framer-motion";

const Banner2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! Thank you.");
    // Add API logic here
  };

  return (
    <section className="w-full bg-gradient-to-br from-white via-green-50 to-white py-16 px-4 xs:px-6 sm:px-10 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute w-64 xs:w-72 h-64 bg-green-100 rounded-full blur-3xl opacity-30 top-10 left-10" />
      <div className="absolute w-60 xs:w-72 h-60 bg-green-200 rounded-full blur-2xl opacity-20 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 relative z-10 items-center">
        {/* LEFT - WHY CHOOSE US */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5 px-2"
        >
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-green-800">
            Why Choose PharmaCo?
          </h2>
          <p className="text-sm xs:text-base md:text-lg text-gray-700">
            At PharmaCo, we are more than just a pharmaceutical company — we are your growth partner. Our commitment to quality, innovation, and ethics sets us apart in the PCD Franchise and third-party manufacturing sector.
          </p>
          <ul className="space-y-2 xs:space-y-3 text-green-800 font-medium text-sm xs:text-base">
            <li>✅ DCGI Approved Product Range</li>
            <li>🌿 GMP-WHO Certified Manufacturing</li>
            <li>🛡️ Monopoly Rights for Franchise Partners</li>
          </ul>
        </motion.div>

        {/* RIGHT - COMPACT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl shadow-md px-5 sm:px-6 py-6 w-full max-w-md mx-auto space-y-3 text-green-900"
        >
          <h3 className="text-lg xs:text-xl font-semibold text-center mb-1">
            Request Price List
          </h3>

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone No"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            name="message"
            placeholder="Message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 rounded-full shadow-md hover:bg-green-700 transition text-sm"
          >
            Send
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Banner2;
