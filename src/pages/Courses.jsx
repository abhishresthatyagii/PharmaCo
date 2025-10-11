import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PlusCircle, MinusCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

const products = [
  { name: "Calcium", category: "Supplements", image: "/Medicines/Calcium.png", price: 120, description: "Essential for strong bones and teeth." },
  { name: "Paracetamol 500mg", category: "Pain Relief", image: "/Medicines/Paracetamol.png", price: 45, description: "Effective for pain and fever relief." },
  { name: "Amoxicillin 250mg", category: "Antibiotic", image: "/Medicines/Amoxicilin.png", price: 90, description: "antibiotic for bacterial infections." },
  { name: "Cetirizine 10mg", category: "Allergy", image: "/Medicines/Cetirizine.png", price: 35, description: "Used for allergy symptoms." },
  { name: "Ibuprofen 400mg", category: "Pain Relief", image: "/Medicines/Ibuprofen400mg.png", price: 55, description: "Anti-inflammatory and pain reliever." },
  { name: "Azithromycin 500mg", category: "Antibiotic", image: "/Medicines/Azithromycin.png", price: 120, description: "Antibiotic for respiratory infections." },
  { name: "Pantoprazole 40mg", category: "Digestive", image: "/Medicines/Pantaprazole.png", price: 70, description: "Treats acid reflux and ulcers." },
  { name: "Dolo 650mg", category: "Pain Relief", image: "/Medicines/dolo650.png", price: 60, description: "Pain and fever reducer." },
  { name: "Metformin 500mg", category: "Diabetes", image: "/Medicines/Metformin.png", price: 80, description: "Used for managing diabetes." },
  { name: "Losartan 50mg", category: "Blood Pressure", image: "/Medicines/Losartan500.png", price: 95, description: "Treats high blood pressure." },
];

export default function PharmaCoProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { cart, addToCart, updateQty, removeItem } = useCart();

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, category]);

  // Helper to get cart quantity for a product
  const getCartQty = (product) => {
    const cartItem = cart.find((c) => c.name === product.name);
    return cartItem ? cartItem.qty : 0;
  };

  return (
    <section className="min-h-screen bg-green-50 px-6 md:px-16 pt-24">
      {/* Search & Category Filter */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search for medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-400 text-gray-700 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm transition font-medium ${
                category === cat
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white border border-green-400 text-green-700 hover:bg-green-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <AnimatePresence>
          {filteredProducts.map((product, index) => {
            const qty = getCartQty(product);
            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-green-100 flex flex-col items-center text-center p-4"
              >
                <div className="w-full h-36 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="h-32 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-green-800 mt-3 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                <p className="text-green-700 font-semibold mt-1 text-sm">
                  ₹{product.price.toFixed(2)}
                </p>

                {/* Add to cart or quantity controls */}
                {qty === 0 ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-green-600 text-white text-sm py-2 rounded-full hover:bg-green-700 transition-all shadow-sm"
                  >
                    <PlusCircle size={16} /> Add to Cart
                  </motion.button>
                ) : (
                  <div className="flex items-center justify-center gap-2 mt-3 w-full border border-green-400 rounded-full px-2 py-1 bg-green-50">
                    <button
                      onClick={() => updateQty(product, -1)}
                      className="text-green-700 p-1"
                    >
                      <MinusCircle size={20} />
                    </button>
                    <span className="font-medium text-green-800">{qty}</span>
                    <button
                      onClick={() => updateQty(product, 1)}
                      className="text-green-700 p-1"
                    >
                      <PlusCircle size={20} />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
