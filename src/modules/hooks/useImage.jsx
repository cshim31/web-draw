import { useMotionValue } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useInterval } from 'react-use';
import { DrawContext } from "../Context/DrawContext";
import { socket } from "../../common/lib/socket";

export default function useImage(imageData, index) {

    const x = useMotionValue(imageData.x);
    const y = useMotionValue(imageData.y);
    //const [x, setX] = useState(imageData.x);
    //const [y, setY] = useState(imageData.y);
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
                x: x.get(),
                y: y.get()
            }
        }

        socket.emit("action", "image_update", data);
    }

    useInterval(() => {
        sendImageData();
    }, 1000)

    useEffect(() => {
        x.set(imageData.x);
        y.set(imageData.y);
    }, [x, y, imageData.x, imageData.y])

    return {
        x,
        y,
        imageWidth,
        imageHeight,
        setImageWidth,
        setImageHeight
    };
}