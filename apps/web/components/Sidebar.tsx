import Image from "next/image";
import Logo from "@public/Logo.svg";
import Button from "./Button";
import CrossIcon from "@icons/CrossIcon";
import { useRouter } from "next/navigation";
import ArrowIcon from "@icons/ArrowIcon";
import { Dispatch, SetStateAction, useEffect } from "react";

type SidebarProps = {
    navMenuOpen: boolean;
    setNavmenuOpen: Dispatch<SetStateAction<boolean>>;
}

const menuData = [
    { id: 1, title: "About Us", href: "/about" },
    { id: 2, title: "Contact Us", href: "/contact" },
    { id: 3, title: "Pricing", href: "/pricing" },
    { id: 4, title: "Enterprise", href: "/enterprise" },
    { id: 5, title: "Features", href: "/features" },
    { id: 6, title: "Developers", href: "/developers" }
];

const Sidebar = ({ navMenuOpen, setNavmenuOpen }: SidebarProps) => {
    const router = useRouter();

    useEffect(() => {
        if (navMenuOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [navMenuOpen]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className={`fixed inset-0 w-full h-screen sm:hidden p-4 bg-[#1A1A19] z-50 transition-all duration-300 transform ${
                navMenuOpen 
                    ? "translate-y-0 opacity-100" 
                    : "-translate-y-full opacity-0 pointer-events-none"
            }`}
        >
            <div className="flex justify-between items-center">
                <Image 
                    src={Logo} 
                    width={152} 
                    height={180} 
                    alt="Company Logo" 
                />
                <Button
                    icon={<CrossIcon aria-hidden="true" />}
                    className="bg-transparent p-2"
                    onClick={() => setNavmenuOpen(false)}
                    aria-label="Close menu"
                    autoFocus
                />
            </div>
            <nav className="w-full mt-12 space-y-4">
                {menuData.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            router.push(item.href);
                            setNavmenuOpen(false);
                        }}
                        className="w-full flex justify-between items-center px-4 py-3 text-white text-base font-semibold hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <span>{item.title}</span>
                        <ArrowIcon aria-hidden="true" />
                    </button>
                ))}
            </nav>
            <div className="mt-12 w-full flex justify-center">
                <Button 
                    text="Sign Up" 
                    onClick={() => router.push("/signup")}
                    className="w-full max-w-[200px]"
                />
            </div>
        </div>
    );
};

export default Sidebar;