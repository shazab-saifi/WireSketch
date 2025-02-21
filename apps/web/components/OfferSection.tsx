import Image from "next/image"
import Button from "./Button"
import arrow from "@public/arrow.svg"
import text from "@public/text.svg"
import rain from "@public/rain.svg"
import Frame1 from "@public/Frame1.svg"
import Frame2 from "@public/Frame2.svg"
import broke from "@public/broke.svg"
import { motion } from "motion/react"
import { scrollVariants } from "@lib/MotionVarients"

const OfferSection = () => {
    return (
        <div className=" text-white text-center mt-16 px-4 flex flex-col items-center">
            <motion.div
                variants={scrollVariants.variant1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Image
                    src={Frame1}
                    alt="broke text image"
                    className="relative top-8 -left-28 lg:w-24"
                />
                <h1 className="text-[28px] font-bold text-[#859F3D]">FREE</h1>
            </motion.div>
            <motion.h4
                className="mt-4 text-[16px] xl:text-[22px] my-3"
                variants={scrollVariants.variant2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                Try the forever free editor for yourself
            </motion.h4>
            <motion.p
                className="text-[14px] xl:text-[16px]"
                variants={scrollVariants.variant3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                Don’t take our word for granted.<br className="hidden md:block" />
                Try the forever free Excalidraw open-sourced editor<br className="hidden md:block" />
                for yourself and get your ideas out there.
            </motion.p>
            <motion.div
                className="space-x-4 mt-5"
                variants={scrollVariants.variant4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Button text="Start Now" />
                <Button text="Premium" className="bg-transparent ring-4 ring-[#31511E]" />
            </motion.div>
            <motion.div
                variants={scrollVariants.variant4}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-[320px] sm:w-[375px] relative"
            >
                <Image
                    src={arrow}
                    alt="arrow"
                    className="absolute right-24 lg:right-28 mt-2"
                />
                <Image
                    src={text}
                    alt="Premium text"
                    className="absolute right-6 bottom mt-6 lg:w-24"
                />
                <Image
                    src={Frame2}
                    alt="rain image"
                    className="mt-2 ml-4 lg:w-24"
                />
            </motion.div>
        </div>
    )
}

export default OfferSection