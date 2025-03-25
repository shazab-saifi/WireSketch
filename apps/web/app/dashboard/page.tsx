"use client"

import Canvas from "@components/Canvas"
import Toolbar from "@components/canvascomponents/Toolbar"
import { StatePrivoder } from "state/context"

const page = () => {
  return <div className="w-screen h-screen bg-[#1A1A19] fixed flex justify-center">
    <StatePrivoder>
      <Canvas>
        <Toolbar />
      </Canvas>
    </StatePrivoder>
  </div>
}

export default page