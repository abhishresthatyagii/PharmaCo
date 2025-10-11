import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaArrowUp,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";

const UltimateFooter = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/" },
    { icon: <FaInstagram />, label: "Instagram", href: "#" },
    { icon: <FaFacebookF />, label: "Facebook", href: "#" },
    { icon: <FaLinkedinIn />, label: "LinkedIn", href: "#" },
    { icon: <FaYoutube />, label: "YouTube", href: "#" },
    { icon: <TbWorldWww />, label: "Website", href: "#" },
  ];

  const quickLinks = ["Home", "About", "Products", "Careers", "Contact"];

  return (
    <footer className="relative bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-800 overflow-hidden">
      {/* Top Decorative Blobs */}
      <div className="absolute w-64 h-64 bg-green-200/30 rounded-full blur-3xl top-[-80px] left-[-60px] z-0 animate-bounceSlow"></div>
      <div className="absolute w-72 h-72 bg-teal-200/30 rounded-full blur-3xl bottom-[-100px] right-[-80px] z-0 animate-bounceSlow"></div>

      <div className="relative z-10 container mx-auto px-6 py-12 grid lg:grid-cols-4 gap-10">
        {/* Logo & About */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-3xl font-bold text-green-800 flex items-center gap-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded">P</span> PharmaCo.
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            Delivering quality formulations, trusted by professionals across the nation — backed by 20+ years of innovation and excellence.
          </p>
          <div className="flex gap-4 mt-2">
            {socialLinks.map(({ icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.3, rotate: 10 }}
                className="text-green-700 hover:text-green-900 transition"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="font-semibold text-lg text-green-900 mb-3 border-b border-green-200 pb-1 w-fit">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            {quickLinks.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="hover:text-green-600 hover:underline transition">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-2"
        >
          <h4 className="font-semibold text-lg text-green-900 mb-3 border-b border-green-200 pb-1 w-fit">
            Contact Us
          </h4>
          <p className="flex items-center gap-2 text-sm">
            <FaPhoneAlt className="text-green-600" /> +91-9876543210
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaEnvelope className="text-green-600" /> info@pharmaco.com
          </p>
          <p className="flex items-center gap-2 text-sm">
            <TbWorldWww className="text-green-600" /> www.pharmaco.com
          </p>
        </motion.div>

        {/* Newsletter / Request Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-2"
        >
          <h4 className="font-semibold text-lg text-green-900 mb-3 border-b border-green-200 pb-1 w-fit">
            Subscribe
          </h4>
          <p className="text-sm text-gray-700">Get updates on new products and offers:</p>
          <div className="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-green-100" />

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-green-800 text-green-50 px-6 py-4 text-sm flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <span>© 2025 PharmaCo. All rights reserved.</span>
        <span className="flex gap-4 items-center">
          Designed with ❤️ by PharmaCo Team
        </span>
      </motion.div>

      {/* Scroll to Top */}
      {showScrollBtn && (
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.2 }}
          className="fixed bottom-6 right-6 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </footer>
  );
};

export default UltimateFooter;
