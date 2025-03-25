"use client"

import React, { useContext } from 'react'
import { Icon } from "@iconify/react"
import { Context } from 'state/context'

const Toolbar = () => {
  const {tool, setTool} = useContext(Context);
  console.log(tool);

  const icons = [
    { icon: "prime:lock", action: () => setTool('lock') },
    { icon: "ri:hand", action: () => setTool('hand') },
    { icon: "iconamoon:cursor", action: () => setTool('cursor') },
    { icon: "hugeicons:square", action: () => setTool('rectangle') },
    { icon: "mynaui:circle", action: () => setTool('circle') },
    { icon: "cuida:arrow-right-outline", action: () => setTool('arrow') },
    { icon: "pepicons-pop:line-x", action: () => setTool('line') },
    { icon: "mingcute:pencil-fill", action: () => setTool('pencil') },
    { icon: "mi:text", action: () => setTool('text') },
    { icon: "solar:eraser-bold", action: () => setTool('eraser') },
    { icon: "solar:gallery-bold", action: () => setTool('gallery') }
  ];

  return (
    <div className='absolute bottom-6 left-1/2 -translate-x-1/2 text-white z-50 flex bg-[#212121] space-x-2 py-2 px-4 rounded-xl shadow-xl'>
      {icons.map(({ icon, action }, index) => (
        <Icon
          key={index}
          icon={icon}
          fontSize={38}
          className='hover:bg-[#31511E] rounded-xl p-2'
          onClick={action}
        />
      ))}
    </div>
  )
}

export default Toolbar
