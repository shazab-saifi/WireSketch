import { createContext, Dispatch, ReactNode, SetStateAction, useRef, useState } from "react";

type ToolContextType = {
    tool: string;
    setTool: Dispatch<SetStateAction<string>>;
    fileInputRef: React.MutableRefObject<HTMLInputElement | null>
    isLock: boolean;
    setIsLock: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<ToolContextType>({
    tool: '',
    setTool: () => { },
    fileInputRef: { current: null },
    isLock: false,
    setIsLock: () => {}
});

export const StateProvider = ({ children }: { children: ReactNode }) => {
    const [tool, setTool] = useState('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isLock, setIsLock] = useState(false);

    return (
        <Context.Provider value={{ tool, setTool, fileInputRef, isLock, setIsLock }}>
            {children}
        </Context.Provider>
    )
}