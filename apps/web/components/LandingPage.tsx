"use client"

import dynamic from "next/dynamic";
import Navbar from "./Navbar";
const HeroSection = dynamic(() => import("@components/HeroSection"));
const ReviewSection = dynamic(() => import("@components/ReviewSection"));

export default function Landing() {
  return (
    <div className="bg-[#1A1A19] w-full h-full">
      <Navbar />
      <HeroSection />
      <ReviewSection />
    </div>
  )
}