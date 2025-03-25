import Canvas from "@components/Canvas"
import Toolbar from "@components/canvascomponents/Toolbar"

const page = () => {
    return <div className="w-screen h-screen bg-[#1A1A19] fixed flex justify-center">
      <Canvas>
        <Toolbar />
      </Canvas>
    </div>
}

export default page