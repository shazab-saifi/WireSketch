import { cn } from '@lib/utils'
import React from 'react'

type CardProps = {
    desc: string;
    email: string;
    image: React.ReactNode;
    className: string;
}

export const Card = ({desc, email, image, className}: CardProps) => {
  return (
    <div className={cn("w-[18.75rem] h-[22.5rem]", className)}>
        <div className='w-full h-full relative top-16'>

        </div>
    </div>
  )
}
