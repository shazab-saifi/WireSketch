import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type ToolContextType = {
    tool: string;
    setTool: Dispatch<SetStateAction<string>>
}

export const Context = createContext<ToolContextType>({
    tool: '',
    setTool: () => {}
});

export const StatePrivoder = ({children}: {children: ReactNode}) => {
    const [tool, setTool] = useState('');

    return (
        <Context.Provider value={{tool, setTool}}>
            {children}
        </Context.Provider>
    )
}