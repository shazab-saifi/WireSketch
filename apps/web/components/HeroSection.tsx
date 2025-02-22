import Image from "next/image";
import woman from "@public/woman.svg";
import { motion } from "motion/react";
import Button from "./Button";
import { scrollVariants } from "@lib/MotionVarients";

const HeroSection = () => {
  const headingClass = "font-bold text-center leading-10 text-[32px] lg:text-[42px] xl:text-[64px] md:leading-14 xl:leading-20 md:text-5xl lg:leading-11 2xl:text-7xl";
  const subheadingClass = "text-center my-4 sm:my-5 text-[14px] xl:text-[22px]";
  const breakClasses = "hidden sm:block";

  return (
    <div className="w-full px-4 mt-16 pt-16 text-white flex flex-col lg:flex-row lg:px-20 items-center lg:justify-evenly">
      <motion.div
        variants={scrollVariants.variant1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Image
          className="sm:w-[400px] xl:w-[800px] hidden lg:block"
          src={woman}
          alt="woman"
        />
      </motion.div>
      <div>
        <motion.h1
          variants={scrollVariants.variant2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={headingClass}
        >
          Your <span className="text-[#859F3D]">Digital Canvas </span>
          <br className="hidden sm:block xl:hidden 2xl:block" />
          for Creative Ideas
        </motion.h1>
        <motion.p
          variants={scrollVariants.variant3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={subheadingClass}>
          Transform your thoughts into visual masterpieces.
          <br className={breakClasses} />
          WireSketch is the intuitive, collaborative space for
          <br className={breakClasses} />
          wireframing, brainstorming, and designing
          <br className={breakClasses} />
          with ease—just like your favorite canvas tool.
        </motion.p>
        <motion.div
          variants={scrollVariants.variant4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-[156.13px] m-auto">
          <Button text="Try now for free" />
        </motion.div>
      </div>
      <motion.div
        variants={scrollVariants.variant4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Image
          className="sm:w-[400px] lg:hidden"
          src={woman}
          alt="woman"
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;
