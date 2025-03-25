import { atom } from "recoil";

export const selectedTool = atom({
    key: 'selectedToolName',
    default: 'rectangle'
})