import React, { HTMLInputTypeAttribute } from 'react'

type InputBaseProps = {
    type?: HTMLInputTypeAttribute;
}

const Input = ({type}: InputBaseProps) => {
  return (
    <input className='' type={type} />
  )
}

export default Input