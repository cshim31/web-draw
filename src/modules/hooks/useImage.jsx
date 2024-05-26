import { useMotionValue } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useInterval } from 'react-use';
import { DrawContext } from "../Context/DrawContext";
import { socket } from "../../common/lib/socket";

export default function useImage(imageData, index) {

    const [x, setX] = useState(imageData.x);
    const [y, setY] = useState(imageData.y);
    const [imageWidth, setImageWidth] = useState(imageData.width);
    const [imageHeight, setImageHeight] = useState(imageData.height);
    
    const { roomId } = useContext(DrawContext);
    

    function sendImageData() {

        let data = {
            index: index,
            data: {
                base64: imageData.base64,
                width: imageWidth,
                height: imageHeight,
                x: x,
                y: y
            }
        }

        socket.emit("action", "image_update", data);
    }

    useInterval(() => {
        sendImageData();
    }, 1000)

    return {
        x,
        y,
        imageWidth,
        imageHeight,
        setImageWidth,
        setImageHeight
    };
}