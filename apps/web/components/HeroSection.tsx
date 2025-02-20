"use client";

import Image from "next/image";
import woman from "@public/woman.svg";
import { motion } from "motion/react";
import Button from "./Button";

const HeroSection = () => {
  const headingClass = "font-bold text-center leading-9 text-[32px] lg:text-[42px] xl:text-[64px] md:leading-14 xl:leading-20 md:text-5xl lg:leading-11 2xl:text-7xl";
  const subheadingClass = "text-center my-3 sm:my-4 text-[14px] xl:text-[22px]";
  const breakClasses = "hidden sm:block";

  return (
    <div className="w-full px-4 mt-8 text-white flex flex-col lg:flex-row lg:px-20 items-center lg:justify-evenly">
      {/* Desktop Image */}
      <Image
        className="sm:w-[400px] xl:w-[600px] hidden lg:block"
        src={woman}
        alt="woman"
      />
      <div>
        <motion.h1 className={headingClass}>
          Your <span className="text-[#859F3D]">Digital Canvas </span>
          <br className="hidden sm:block xl:hidden 2xl:block" />
          for Creative Ideas
        </motion.h1>
        <motion.p className={subheadingClass}>
          Transform your thoughts into visual masterpieces.
          <br className={breakClasses} />
          WireSketch is the intuitive, collaborative space for
          <br className={breakClasses} />
          wireframing, brainstorming, and designing
          <br className={breakClasses} />
          with ease—just like your favorite canvas tool.
        </motion.p>
        <div className="w-[156.13px] m-auto">
          <Button text="Try now for free" />
        </div>
      </div>
      {/* Mobile Image */}
      <Image
        className="sm:w-[400px] lg:hidden"
        src={woman}
        alt="woman"
      />
    </div>
  );
};

export default HeroSection;
