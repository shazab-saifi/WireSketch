import Image from "next/image"
import Logo from "@public/Logo.png"
import Button from "./Button"
import CrossIcon from "@icons/CrossIcon"

const Sidebar = () => {
    return (
        <div className="w-full h-screen">
            <div className="flex justify-between items-center">
                <Image src={Logo} alt="Logo" />
                <CrossIcon />
            </div>
            <div>
                <div>
                    <span>Products</span>
                    
                </div>
            </div>
            <Button text="Sign up" className="w-auto" />
        </div>
    )
}

export default Sidebar