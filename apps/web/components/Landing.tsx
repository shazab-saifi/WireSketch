"use client"

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ReviewSection from "./ReviewSection";
import AISection from "./AISection";

export default function Landing() {
  return (
    <div className="bg-[#1A1A19] w-full h-full">
      <Navbar />
      <HeroSection />
      <ReviewSection />
      <AISection />
    </div>
  )
}