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
    const [userId, setUserId] = useState("");
    const [roomId, setRoomId] = useState("");
    return (
        <DrawContext.Provider 
        value={{
            drawLayer,
            imageLayer,
            drawCanvasRef,
            imageDatas, 
            mode,
            userId,
            roomId,
            setMode,
            setImageDatas,
            setUserId,
            setRoomId
        }}
        >
            {children}
        </DrawContext.Provider>
    );
};