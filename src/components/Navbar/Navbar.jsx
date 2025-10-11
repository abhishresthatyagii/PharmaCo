import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const navLinks = [
    { name: "Dashboard", path: "/app/Dashboard" },
    { name: "About", path: "/app/About" },
    { name: "Contacts", path: "/app/ContactSection" },
    { name: "Products", path: "/app/Courses" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#e6f4ea] shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
        {/* Logo */}
        <Link
          to="/app/Dashboard"
          className="text-2xl font-bold text-[#14532d] tracking-wide"
        >
          PharmaCo
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`relative text-lg font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-[#14532d] underline underline-offset-4 decoration-2"
                    : "text-[#2f855a]"
                } hover:text-[#1c4532]`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Cart Icon */}
          <li className="relative">
            <Link
              to="/app/cart"
              className="text-[#2f855a] hover:text-[#14532d]"
            >
              <ShoppingCart size={28} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#14532d]">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-4 bg-[#e6f4ea] border-t border-green-100">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium ${
                  location.pathname === link.path
                    ? "text-[#14532d] underline underline-offset-4"
                    : "text-[#2f855a]"
                } hover:text-[#1c4532] transition`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Mobile Cart */}
          <li className="relative">
            <Link
              to="/app/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-[#2f855a] hover:text-[#14532d]"
            >
              <ShoppingCart size={28} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
