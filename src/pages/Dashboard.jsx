import React from "react";
import Navbar from "../components/Navbar/Navbar"; // adjust path as needed
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";

import Subscribe from "../components/Subscribe/Subscribe";
import Banner2 from "../components/Banner/Banner2"
import Testimonial from "../components/CertificateCarousel";
import Team from "../components/TrendingProducts";
import FAQ from "../components/TopManufacturers";

import Footer from "../components/Footer/Footer";


const Dashboard = () => {
  return (
    <main className="overflow-x-hidden bg-white text-dark scroll-smooth">

     
      
       <Hero />
      <Services />
      <Subscribe />
      <Banner2 />

      <Testimonial />
      <Team />
      <FAQ />
      <Footer/>

    </main>
  );
};

export default Dashboard;
