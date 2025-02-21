"use client"

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ReviewSection from "./ReviewSection";
import AISection from "./AISection";
import OfferSection from "./OfferSection";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div className="bg-[#1A1A19] w-full h-full">
      <Navbar />
      <HeroSection />
      <ReviewSection />
      <AISection />
      <OfferSection />
      <Footer />
    </div>
  )
}