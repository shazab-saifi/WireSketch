"use client"

import React, { useContext } from 'react'
import { Icon } from "@iconify/react"
import { Context } from 'state/context'

const Toolbar = () => {
  const { tool, setTool } = useContext(Context);

  const icons = [
    { icon: "prime:lock", toolName: "lock" },
    { icon: "ri:hand", toolName: "hand" },
    { icon: "iconamoon:cursor", toolName: "cursor" },
    { icon: "hugeicons:square", toolName: "rectangle" },
    { icon: "mynaui:circle", toolName: "circle" },
    { icon: "cuida:arrow-right-outline", toolName: "arrow" },
    { icon: "pepicons-pop:line-x", toolName: "line" },
    { icon: "mingcute:pencil-fill", toolName: "pencil" },
    { icon: "mi:text", toolName: "text" },
    { icon: "solar:eraser-bold", toolName: "eraser" },
    { icon: "solar:gallery-bold", toolName: "gallery" }
  ];

  return (
    <div className='absolute bottom-6 left-1/2 -translate-x-1/2 text-white z-[999] flex bg-[#212121] space-x-2 py-2 px-4 rounded-xl shadow-xl'>
      {icons.map(({ icon, toolName }, index) => (
        <Icon
          key={index}
          icon={icon}
          fontSize={38}
          className={`rounded-xl p-2 cursor-pointer transition-colors duration-200 ${
            tool === toolName ? "bg-[#31511E]" : ""
          }`}
          onClick={() => setTool(toolName)}
        />
      ))}
    </div>
  );
}

export default Toolbar;
