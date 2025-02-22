import emily from "@public/emily.svg";
import michael from "@public/michael.svg";
import locus from "@public/locus.svg";
import priya from "@public/priya.svg";
import Image from "next/image";
import { scrollVariants } from "@lib/MotionVarients";
import { motion } from "motion/react"

const ReviewSection = () => {
  const cardsData = [
    {
      desc: '"WireSketch is a total game-changer! Its intuitive interface makes wireframing and brainstorming effortless. I can quickly capture my ideas and share them with my team. Highly recommended!"',
      email: "emily.r@example.com",
      avatar: emily
    },
    {
      desc: "I've tried several digital canvas tools, but WireSketch stands aout with its simplicity and robust features. It’s perfect for turning rough sketches into refined concepts in no time.",
      email: "michael.s@example.com",
      avatar: michael
    },
    {
      desc: '"Collaboration has never been easier. WireSketch’s real-time editing has significantly improved how my team works together, making our design sessions both fun and productive."',
      email: "priya.k@example.com",
      avatar: priya
    },
    {
      desc: '"Collaboration has never been easier. WireSketch’s real-time editing has significantly improved how my team works together, making our design sessions both fun and productive."',
      email: "lucas.d@example.com",
      avatar: locus
    }
  ]

  return (
    <div className="px-4 mt-18">
      <motion.h1
        variants={scrollVariants.variant2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-white font-bold text-[28px] lg:text-[42px] xl:text-5xl text-center leading-9">
        Reviews from our <span className="text-[#859F3D]">USERS</span>
      </motion.h1>
      <div className="flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-center lg:gap-12">
        {/* First group of two cards */}
        <div className="flex flex-col lg:flex-row lg:justify-evenly lg:space-x-12">
          {cardsData.slice(0, 2).map((data) => (
            <motion.div
              key={data.email}
              variants={scrollVariants.variant2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center hover:-translate-y-3 transition-transform">
              <Image
                src={data.avatar}
                width={80}
                alt="avatar"
                className="relative top-10 lg:top-11 lg:w-[100px]"
              />
              <div className="w-[15.448rem] h-[17rem] lg:h-[20rem] bg-[#212121] text-white font-medium px-9 pb-6 pt-16 rounded-2xl flex flex-col items-center justify-between">
                <p className="text-[12px] lg:text-[14px] font-medium text-center">{data.desc}</p>
                <span className="relative lg:text-[16px] bottom-0 text-[#859F3D]">
                  {data.email}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second group of two cards */}
        <div className="flex flex-col lg:flex-row lg:justify-evenly lg:space-x-12">
          {cardsData.slice(2, 4).map((data) => (
            <motion.div
              key={data.email}
              variants={scrollVariants.variant2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center hover:-translate-y-3 transition-transform">
              <Image
                src={data.avatar}
                width={80}
                alt="avatar"
                className="relative top-10 lg:top-11 lg:w-[100px]"
              />
              <div className="w-[15.448rem] h-[17rem] lg:h-[20rem] bg-[#212121] text-white font-medium px-9 pb-6 pt-16 rounded-2xl flex flex-col items-center justify-between">
                <p className="text-[12px] lg:text-[14px] font-medium text-center">{data.desc}</p>
                <span className="relative lg:text-[16px] bottom-0 text-[#859F3D]">
                  {data.email}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default ReviewSection