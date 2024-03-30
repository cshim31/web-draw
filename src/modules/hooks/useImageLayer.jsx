import { useContext, useEffect } from "react";
import { socket } from "../../common/lib/socket";

export default function useImageLayer() {

    const { setImageDatas } = useContext;


    useEffect(() => {
        socket.on("action", "image_add", (data) => {
            setImageDatas(data);
        });

        socket.on("action", "image_update", (data) => {
            setImageDatas(data);
        });
    })

    return {

    };
}