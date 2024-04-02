import { createContext, useRef } from "react";
import { useState } from "react";

export const DrawContext = createContext();

// Create a Context Provider
export const DrawContextProvider = ({ children }) => {
    const drawLayer = useRef(null);
    const imageLayer = useRef(null);
    const drawCanvasRef = useRef(null);
    const [mode, setMode] = useState('draw');
    const [imageDatas, setImageDatas] = useState([]);
    const [userName, setUserName] = useState("");
    const [roomId, setRoomId] = useState("");
    return (
        <DrawContext.Provider 
        value={{
            drawLayer,
            imageLayer,
            drawCanvasRef,
            imageDatas, 
            mode,
            userName,
            roomId,
            setMode,
            setImageDatas,
            setUserName,
            setRoomId
        }}
        >
            {children}
        </DrawContext.Provider>
    );
};