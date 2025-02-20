import HeroSection from "@components/HeroSection";
import Navbar from "@components/Navbar";


export default function Home() {
  return (
    <div className="bg-[#1A1A19] w-full h-screen">
      <Navbar/>
      <HeroSection />
    </div>
  )
}