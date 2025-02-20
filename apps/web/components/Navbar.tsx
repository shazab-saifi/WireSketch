"use client"
import Logo from "@public/Logo.png"
import Image from "next/image"
import GithubIcon from "@icons/GithubIcon";
import Link from "next/link";
import Button from "./Button";
import Menu from "@icons/Menu";
import { redirect } from "next/navigation";
import { useState } from "react";
import CrossIcon from "@icons/CrossIcon";
import ArrowIcon from "@icons/ArrowIcon";

const Navbar = () => {
    const [navMenuOpen, setNavmenuOpen] = useState(false);

    const menuData = [
        {
            id: 1,
            title: "About Us"
        },
        {
            id: 2,
            title: "Contact Us"
        },
        {
            id: 3,
            title: "Pricing"
        },
        {
            id: 4,
            title: "Enterprise"
        },
        {
            id: 5,
            title: "Features"
        },
        {
            id: 6,
            title: "Developers"
        }
    ];

    return (
        <>
            {navMenuOpen === false && <div className="w-full md:px-16 lg:px-20 px-4 pt-4">
                <div className="flex justify-between items-center">
                    <Image src={Logo} width={152} height={180} alt="logo" />
                    <Button icon={<Menu />} className="p-2 sm:hidden" onClick={() => setNavmenuOpen(prev => !prev)} />
                    <div className="lg:space-x-[3.125rem] md:space-x-[1.875rem] sm:space-x-[1.375rem] lg:text-[14px] sm:text-[10px] font-semibold text-white sm:flex justify-center items-center hidden">
                        <span className="cursor-pointer hover:opacity-70">About Us</span>
                        <span className="cursor-pointer hover:opacity-70">Contact Us</span>
                        <span className="cursor-pointer hover:opacity-70">Pricing</span>
                        <span className="cursor-pointer hover:opacity-70">Enterprise</span>
                    </div>
                    <div className="hidden space-x-7 items-center sm:flex">
                        <Link href="https://github.com/shazab-saifi/WireSketch.git">
                            <GithubIcon />
                        </Link>
                        <Button onClick={() => redirect("/sigup")} text="Sign Up" />
                    </div>
                </div>
            </div>}
            {/* Navmenu for mobile */}
            {navMenuOpen && <div className="w-full h-screen sm:hidden p-4 absolute top-0 bg-[#1A1A19]">
                <div className="flex justify-between items-center">
                    <Image src={Logo} width={152} height={180} alt="logo" />
                    <Button icon={<CrossIcon />} className="bg-transparent p-2" onClick={() => setNavmenuOpen(prev => !prev)} />
                </div>
                <div className="w-full mt-12 space-y-8 mr-7 text-white text-[16px] font-semibold flex flex-col">
                    {menuData.map((item) => (
                        <div key={item.id} className="flex justify-between items-center" onClick={() => redirect("/about")}>
                            <span className="cursor-pointer">{item.title}</span>
                            <Button icon={<ArrowIcon />} className="bg-transparent pr-4" />
                        </div>
                    ))}
                </div>
                <div className="mt-12 w-full flex justify-center">
                    <Button text="Sign Up" />
                </div>
            </div>}
        </>
    );
}

export default Navbar