"use client"

import Logo from "@public/Logo.svg"
import Image from "next/image"
import GithubIcon from "@icons/GithubIcon";
import Link from "next/link";
import Button from "./Button";
import Menu from "@icons/Menu";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [navMenuOpen, setNavmenuOpen] = useState(false);
    const router = useRouter();

    return (
        <nav className="w-full md:px-16 lg:px-20 px-4 py-4 fixed top-0 left-0 z-40 bg-[#1A1A19] border-b-0">
            <div className="flex justify-between items-center">
                <Image src={Logo} width={152} height={180} alt="logo" />
                <Button 
                    icon={<Menu />} 
                    className="p-2 sm:hidden" 
                    onClick={() => setNavmenuOpen(true)}
                    aria-label="Open menu"
                />
                <div className="lg:space-x-[3.125rem] md:space-x-[1.875rem] sm:space-x-[1.375rem] lg:text-[14px] sm:text-[10px] font-semibold text-white sm:flex justify-center items-center hidden">
                    <button onClick={() => router.push('/about')} className="hover:opacity-70">About Us</button>
                    <button onClick={() => router.push('/contact')} className="hover:opacity-70">Contact Us</button>
                    <button onClick={() => router.push('/pricing')} className="hover:opacity-70">Pricing</button>
                    <button onClick={() => router.push('/enterprise')} className="hover:opacity-70">Enterprise</button>
                </div>
                <div className="hidden space-x-7 items-center sm:flex">
                    <Link href="https://github.com/shazab-saifi/WireSketch.git" aria-label="GitHub repository">
                        <GithubIcon />
                    </Link>
                    <Button 
                        onClick={() => router.push("/signup")} 
                        text="Sign Up" 
                    />
                </div>
            </div>
            <Sidebar navMenuOpen={navMenuOpen} setNavmenuOpen={setNavmenuOpen} />
        </nav>
    );
}

export default Navbar;