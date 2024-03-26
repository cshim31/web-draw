import { useMotionValue } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { useInterval } from 'react-use';
import { DrawContext } from "../Context/DrawContext";
import { socket } from "../../common/lib/socket";

export default function useImage(imageData, index) {

    const x = useMotionValue(imageData.x);
    const y = useMotionValue(imageData.y);
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

        socket.emit("action", "image_update", roomId, data);
    }

    useInterval(() => {
        sendImageData();
    }, 1000)

    useEffect(() => {
        socket.on("action", "image_update", (newImageMotion) => {
            x = newImageMotion.x;
            y = newImageMotion.y;
            setImageWidth(newImageMotion.imageWidth);
            setImageWidth(newImageMotion.imageHeight);
        })
    })

    return {
        x,
        y,
        imageWidth,
        imageHeight,
        setImageWidth,
        setImageHeight
    };
}