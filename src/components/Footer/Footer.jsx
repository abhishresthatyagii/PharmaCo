import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaArrowUp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";

const Footer = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-green-50 via-white to-green-100 text-gray-800 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto grid md:grid-cols-3 gap-10 px-6 py-12 relative z-10"
      >
        {/* Left Column */}
        <div className="space-y-4 max-w-md">
          <h3 className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded">P</span> PharmaCo.
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            Delivering quality formulations, trusted by professionals across the
            nation — backed by 20+ years of innovation and excellence.
          </p>
        </div>

        {/* Center Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-lg text-green-900 mb-2 border-b border-green-200 pb-1 w-fit">
            Quick Links
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {[
              "Home",
              "About",
              "Products",
              "Careers",
              "Contact",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-green-600 hover:underline transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-lg text-green-900 mb-2 border-b border-green-200 pb-1 w-fit">
            Request Quote
          </h4>
          <form className="flex flex-col gap-2 text-sm">
            <input
              type="text"
              placeholder="Your Name"
              className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <textarea
              placeholder="Message"
              rows="3"
              className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-fit px-4 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-green-100" />

      {/* Bottom Bar */}
      <div className="bg-green-800 text-green-100 px-4 py-4 text-sm flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex gap-5 text-lg">
          {[
            { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/" },
            { icon: <FaInstagram />, label: "Instagram", href: "#" },
            { icon: <TbWorldWww />, label: "Website", href: "#" },
            { icon: <FaYoutube />, label: "YouTube", href: "#" },
          ].map(({ icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="transition hover:text-white"
            >
              {icon}
            </motion.a>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-green-50">
          <span className="flex items-center gap-1">
            <FaPhoneAlt /> +91-9876543210
          </span>
          <span className="flex items-center gap-1">
            <FaEnvelope /> info@pharmaco.com
          </span>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
