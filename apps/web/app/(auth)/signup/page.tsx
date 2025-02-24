import Button from '@components/Button'
import Input from '@components/Input'
import React from 'react'
import google from '@public/google.svg'
import Image from 'next/image'

const page = () => {
    return (
        <div className='w-full h-screen bg-[#1A1A19] flex items-center justify-center px-4'>
            <div className='rounded-3xl bg-[#212121] text-center px-14 py-16 space-y-5 '>
                <div>
                    <h1 className='text-white text-3xl font-bold'>Welcome to</h1>
                    <h2 className='text-[#859F3D] text-2xl font-bold'>WireSketch</h2>
                </div>
                <div className='space-y-4'>
                    <Input type='text' placeholder='Email' />
                    <Input type='text' placeholder='Password' />
                </div>
                <Button text='Sign Up' className='w-full flex justify-center' />
                <div className='flex items-center justify-center space-x-4'>
                    <hr className='text-[#4d4c4c] w-[80px]' />
                    <span className='text-[#4d4c4c] font-medium'>or</span>
                    <hr className='text-[#4d4c4c] w-[80px]' />
                </div>
                <Button text='Sing In with Google' icon={<Image src={google} width={24} alt='google' />} className='w-full text-black bg-white items-center justify-between' />
            </div>
        </div>
    )
}

export default page