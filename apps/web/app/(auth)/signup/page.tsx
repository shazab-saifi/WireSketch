import React from 'react'
import InputForm from '@components/InputForm'

const page = () => {
    return (
        <div className='w-full h-screen bg-[#1A1A19] flex items-center justify-center px-4'>
            <div className='rounded-3xl bg-[#212121] text-center px-14 py-16 space-y-5 max-w-[393px]'>
                <div>
                    <h1 className='text-white text-3xl font-bold'>Welcome to</h1>
                    <h2 className='text-[#859F3D] text-2xl font-bold'>WireSketch</h2>
                </div>
                <InputForm authRoute='signup' />
            </div>
        </div>
    )
}

export default page