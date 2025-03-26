"use client"

import Canvas from "@components/Canvas"
import Toolbar from "@components/canvascomponents/Toolbar"
import { StateProvider } from "state/context"

const page = () => {
  return <div className="w-screen h-screen bg-[#1A1A19] fixed flex justify-center">
    <StateProvider>
      <Canvas>
        <Toolbar />
      </Canvas>
    </StateProvider>
  </div>
}

export default page