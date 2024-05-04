import { useContext, useEffect } from "react";
import { DrawContext } from "../Context/DrawContext";
import { socket } from "../../common/lib/socket";

export default function useImageLayer() {

    const { imageDatas, setImageDatas } = useContext(DrawContext);

    function sendAddedImageData() {

        console.log("send image data in");
        const imageData = imageDatas[imageDatas.length - 1];
        
        if (!imageData) return;
        
        
        const data = {
            base64: imageData.base64,
            width: imageData.imageWidth,
            height: imageData.imageHeight,
            x: imageData.x,
            y: imageData.y
        }

        console.log("sending image data");
        socket.emit("action", "image_add", data);
        console.log("sent image data");
    }

    useEffect(() => {
        socket.on("image_add", (data) => {
            console.log(typeof(imageDatas));
            setImageDatas([...imageDatas, data]);
        });

        socket.on("image_update", (data) => {
            setImageDatas([...imageDatas, data]);
        });
    })

    useEffect(() => {
        sendAddedImageData();
    }, [imageDatas.length])

    return {

    };
}