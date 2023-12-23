import { createContext, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const WebsocketContext = createContext();

// Create a Context Provider
export const WebsocketContextProvider = ({ children }) => {
    const [isReady, setIsReady] = useState(false)

    const ws = useRef(null)

    useEffect(() => {
        const socket = new WebSocket("wss://localhost:80/")

        socket.onopen = () => setIsReady(true)
        socket.onclose = () => setIsReady(false)
        //socket.onmessage = (event) => setVal(event.data)

        ws.current = socket

        return () => {
        socket.close()
        }
    }, [])

    const ret = [isReady, ws.current?.send.bind(ws.current)]

    return (
        <WebsocketContext.Provider value={ret}>
        {children}
        </WebsocketContext.Provider>
    )
};