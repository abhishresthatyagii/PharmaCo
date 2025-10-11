// src/pages/Cart.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, MinusCircle, X, MapPin, QrCode } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";

export default function CartPage() {
  const { cart, updateQty, removeItem, totalPrice, clearCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [manualAddress, setManualAddress] = useState("");
  const [addressCategory, setAddressCategory] = useState("Home");
  const [coords, setCoords] = useState(null);

  const [doctorRef, setDoctorRef] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.onload = initAutocomplete;
      document.body.appendChild(script);
    } else initAutocomplete();
  }, []);

  const initAutocomplete = () => {
    if (window.google && autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        { types: ["geocode"], componentRestrictions: { country: "IN" } }
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setManualAddress(place.formatted_address || "");
        setCoords(null);
      });
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported!");
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCoords({ lat: latitude, lng: longitude });
      setManualAddress("");
      toast.success("✅ Coordinates fetched!");
    });
  };

  const addAddress = () => {
    if (!manualAddress && !coords) return toast.error("Address cannot be empty!");
    const addr = manualAddress || `Lat: ${coords.lat.toFixed(6)}, Lng: ${coords.lng.toFixed(6)}`;
    setAddresses([...addresses, { address: addr, category: addressCategory }]);
    setManualAddress("");
    setCoords(null);
    setSelectedAddressIndex(addresses.length);
    setAddressCategory("Home");
    toast.success("✅ Address added!");
  };

  const handlePlaceOrder = () => {
    if (
      (addresses.length === 0 && !manualAddress && !coords) ||
      !doctorRef ||
      !paymentMethod ||
      (paymentMethod === "UPI" && !upiId) ||
      (paymentMethod === "Card" && !cardNumber)
    ) {
      toast.error("Please fill all required fields!");
      return;
    }
    toast.success("✅ Order placed successfully!");
    clearCart();
    setDoctorRef("");
    setPaymentMethod("");
    setUpiId("");
    setCardNumber("");
    setAddresses([]);
    setSelectedAddressIndex(null);
    setManualAddress("");
    setCoords(null);
  };

  const addressCategories = ["Home", "Office", "Other"];

  return (
    <section className="min-h-screen bg-green-50 px-6 md:px-16 pt-24">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-green-900 mb-6">Your Cart ({cart.length})</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Cart Items */}
        <div className="flex-1 flex flex-col gap-4">
          {cart.length === 0 && (
            <p className="text-gray-500 p-4 bg-white rounded-xl shadow-md">Your cart is empty.</p>
          )}
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.cartItemId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
                  <div>
                    <p className="text-lg font-semibold text-green-800">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(item, -1)} className="text-green-700">
                    <MinusCircle size={22} />
                  </button>
                  <span className="text-lg">{item.qty}</span>
                  <button onClick={() => updateQty(item, 1)} className="text-green-700">
                    <PlusCircle size={22} />
                  </button>
                  <button onClick={() => removeItem(item)} className="text-red-500 ml-2">
                    <X size={22} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Column - Summary & Checkout */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
            <p className="text-2xl font-semibold text-green-800">
              Total: ₹{totalPrice.toFixed(2)}
            </p>

            {/* Address Section */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Delivery Address</label>
              <div className="flex flex-wrap gap-2">
                <input
                  ref={autocompleteRef}
                  type="text"
                  placeholder="Enter address manually"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                />
                <select
                  value={addressCategory}
                  onChange={(e) => setAddressCategory(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                >
                  {addressCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <button
                  onClick={handleUseMyLocation}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-1 transition"
                >
                  <MapPin size={18} /> My Location
                </button>
                <button
                  onClick={addAddress}
                  className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
                >
                  Add
                </button>
              </div>

              {coords && (
                <div className="p-2 mt-2 border rounded-md bg-green-50 text-sm text-gray-700">
                  Latitude: {coords.lat.toFixed(6)}, Longitude: {coords.lng.toFixed(6)}
                </div>
              )}

              {addresses.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                  {addresses.map((addr, idx) => (
                    <div
                      key={idx}
                      className={`p-3 border rounded-md flex justify-between items-center cursor-pointer ${
                        selectedAddressIndex === idx ? "border-green-600 bg-green-50" : "border-gray-300"
                      }`}
                      onClick={() => setSelectedAddressIndex(idx)}
                    >
                      <div>
                        <span className="font-semibold">{addr.category}:</span> {addr.address}
                      </div>
                      <button
                        onClick={() => {
                          setAddresses(addresses.filter((_, i) => i !== idx));
                          if (selectedAddressIndex === idx) setSelectedAddressIndex(null);
                        }}
                        className="text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Doctor Reference */}
            <input
              type="text"
              placeholder="Referred By Doctor"
              value={doctorRef}
              onChange={(e) => setDoctorRef(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-2"
            />

            {/* Payment */}
            <div className="flex flex-col gap-2 mt-2">
              <label className="font-medium text-gray-700">Payment Method</label>
              <div className="flex flex-wrap gap-2">
                {["COD","UPI","Card"].map((method)=>(
                  <button
                    key={method}
                    onClick={()=>setPaymentMethod(method)}
                    className={`flex-1 border p-2 rounded-md text-center font-medium ${
                      paymentMethod===method ? "bg-green-600 text-white" : "bg-white border-green-500"
                    }`}
                  >
                    {method==="COD"?"Cash on Delivery":method==="UPI"?"UPI Payment":"Card Payment"}
                  </button>
                ))}
              </div>

              {paymentMethod==="UPI" && (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g. user@upi)"
                    value={upiId}
                    onChange={(e)=>setUpiId(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md p-2"
                  />
                  <button className="bg-green-600 px-3 py-2 rounded-md text-white flex items-center gap-1 hover:bg-green-700 transition">
                    <QrCode size={18} /> Scan
                  </button>
                </div>
              )}

              {paymentMethod==="Card" && (
                <input
                  type="text"
                  placeholder="Enter Card Number"
                  value={cardNumber}
                  onChange={(e)=>setCardNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mt-2"
                />
              )}
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all transform hover:scale-105"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
