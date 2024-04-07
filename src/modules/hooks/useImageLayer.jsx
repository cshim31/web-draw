import { useContext, useEffect } from "react";
import { socket } from "../../common/lib/socket";

export default function useImageLayer() {

    const { imageDatas, setImageDatas } = useContext;


    useEffect(() => {
        socket.on("image_add", (data) => {
            setImageDatas(...imageDatas, data);
        });

        socket.on("image_update", (data) => {
            setImageDatas(...imageDatas, data);
        });
    })

    return {

    };
}