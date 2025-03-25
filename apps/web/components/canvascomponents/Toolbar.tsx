import React from 'react'
import { Icon } from "@iconify/react"

const Toolbar = () => {
  const icons = [
    { icon: "prime:lock" },
    { icon: "ri:hand" },
    { icon: "iconamoon:cursor" },
    { icon: "hugeicons:square" },
    { icon: "mynaui:circle" },
    { icon: "cuida:arrow-right-outline" },
    { icon: "pepicons-pop:line-x" },
    { icon: "mingcute:pencil-fill" },
    { icon: "mi:text" },
    { icon: "solar:eraser-bold" },
    { icon: "solar:gallery-bold" },
  ];

  return (
    <div className='absolute bottom-6 left-1/2 -translate-x-1/2 text-white z-50 flex bg-[#212121] space-x-2 py-2 px-4 rounded-xl shadow-xl'>
      {icons.map(({ icon }, index) => (
        <Icon
          key={index}
          icon={icon}
          fontSize={38}
          className='hover:bg-[#31511E] rounded-xl p-2'
        />
      ))}
    </div>
  )
}

export default Toolbar
