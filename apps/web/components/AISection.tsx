import Image from 'next/image'
import AI from "@public/AI.svg"
import { motion } from "motion/react"
import { scrollVariants } from '@lib/MotionVarients'

const AISection = () => {
    return (
        <div className='mt-18 flex flex-col items-center justify-center xl:flex-row lg:px-20'>
            <div className='text-white text-center'>
                <motion.h1
                    variants={scrollVariants.variant1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className='font-bold text-[28px] lg:text-[42px] xl:text-5xl text-center leading-9 lg:leading-12 xl:leading-14'>
                    Unleash Your Imagination with<br className='hidden md:block' />
                    <span className='text-[#859F3D]'> AI-POWERED</span> Creativity
                </motion.h1>
                <motion.p
                    variants={scrollVariants.variant2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className='text-[14px] xl:text-[22px] mt-6 xl:max-w-[60vw]'>
                    Experience the future of art with our AI-powered digital canvas. Simply describe your vision,<br className='hidden md:block xl:hidden' />
                    and watch the AI bring your ideas to life in stunning detail. Whether it’s a masterpiece,<br className='hidden md:block xl:hidden' />
                    a sketch, or something entirely unique,
                    the possibilities are endless. Create, explore,<br className='hidden md:block' />
                    and redefine the boundaries of creativity—all at your fingertips.
                </motion.p>
            </div>
            <motion.div
                variants={scrollVariants.variant3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Image className='' src={AI} alt='AI' />
            </motion.div>
        </div>
    )
}

export default AISection