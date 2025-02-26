import { cn } from '@lib/utils'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ type, placeholder, className, value, onChange }: InputProps) => {
  return (
    <input
      className={cn("w-full border-1 rounded-lg px-3 py-2 text-white text-sm", className)}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input