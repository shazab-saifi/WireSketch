import Input from '@components/Input'
import React from 'react'

const page = () => {
    return (
        <div className='w-full h-screen bg-[#1A1A19] flex items-center justify-center'>
            <div className='rounded-xl bg-[#212121] text-center p-16'>
                <h1 className='text-white text-[38px] font-bold'>Welcome to</h1>
                <h2 className='text-[#859F3D] text-[32px] font-bold'>WireSketch</h2>
                <Input type='text' />
            </div>
        </div>
    )
}

export default page