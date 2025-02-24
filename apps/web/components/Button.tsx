import React from "react"
import { cn } from "@lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
    leading?: boolean;
    icon?: React.ReactNode;
}

const Button = ({className, children, onClick, text, leading, icon, ...props}: ButtonProps) => {
    return ( 
        <button onClick={onClick} className={cn("bg-[#31511E] px-5 py-2.5 font-semibold text-[14px] text-center text-white rounded-xl hover:-translate-y-1 active:ring-2 transition-transform cursor-pointer flex", className)} {...props}>
            <span>{icon}</span>
            {text}
        </button>
    );
}

export default Button