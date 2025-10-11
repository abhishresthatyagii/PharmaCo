import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MasterLayout from "./components/Masterlayout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import About from "./pages/About";
import ContactSection from "./pages/Contacts";
import CartPage from "./pages/Cart";
import PharmaCoProducts from "./pages/Courses";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect from root (/) to /app */}
        <Route path="/" element={<Navigate to="/app" replace />} />
        {/* Main layout for /app routes */}
        <Route path="/app" element={<MasterLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Courses" element={<PharmaCoProducts />} />
          <Route path="About" element={<About />} />
          <Route path="ContactSection" element={<ContactSection />} />

          {/* PharmaCo Products and Cart Routes */}
          {/* <Route path="products" element={<PharmaCoProducts />} /> */}
          <Route path="Cart" element={<CartPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
