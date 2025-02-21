import { cn } from '@lib/utils'
import Image from 'next/image';
import React from 'react'

type CardProps = {
  desc: string;
  email: string;
  
  className?: string;
}

export const Card = ({ desc, email, className }: CardProps) => {
  return (
    <div className={cn("w-[18.75rem] h-[22.5rem]", className)}>
      {/* <Image src={image} alt='avatar1' /> */}
      <div className='w-full h-full relative top-1 text-center bg-[#46464F] text-white'>
        <p>{desc}</p>
        <h6>{email}</h6>
      </div>
    </div>
  )
}
