import Image from "next/image"
import Logo from "@public/Logo.svg"
import ContactUs from "@public/ContactUs.svg"
import SocialIcons from "@public/SocialIcons.svg"

const Footer = () => {
  return (
    <div className='mx-4 bg-[#212121] flex flex-col items-center lg:items-start justify-between xl:justify-evenly space-y-16 py-8 lg:py-12 mt-20 xl:mx-20 rounded-t-3xl lg:flex-row lg:px-24'>
      <div className="flex flex-col items-center space-y-16 lg:items-start lg:space-x-8">
        <Image src={Logo} alt="Logo" />
        <Image className="cursor-pointer" src={SocialIcons} alt="Socials links" />
      </div>
      <Image className="lg:hidden" src={ContactUs} alt="Contact us" />
      <ul className="hidden lg:block text-white text-[14px]">
        <li className="text-[#859F3D] font-semibold text-[18px] mb-3">Explore</li>
        <li>Blog</li>
        <li>Library</li>
        <li>Community</li>
        <li>Security & Compliance</li>
        <li>OSS NPM packages</li>
        <li>Terms of use</li>
        <li>Privacy Policy</li>
        <li>Status page</li>
      </ul>
      <ul className="hidden lg:block text-white text-[14px]">
        <li className="text-[#859F3D] font-semibold text-[18px] mb-3">Product</li>
        <li>How to start</li>
        <li>Features</li>
        <li>For teams</li>
        <li>Pricing</li>
        <li>Roadmap</li>
        <li>Release notes</li>
      </ul>
      <ul className="hidden lg:block text-white text-[14px]">
        <li className="text-[#859F3D] font-semibold text-[18px] mb-3">Contact us</li>
        <li>support@WireSketch.com</li>
      </ul>
    </div>
  )
}

export default Footer











