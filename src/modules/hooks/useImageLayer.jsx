import { useContext, useEffect } from "react";
import { DrawContext } from "../Context/DrawContext";
import { socket } from "../../common/lib/socket";

export default function useImageLayer() {

    const { imageDatas, setImageDatas } = useContext(DrawContext);

    useEffect(() => {
        socket.on("image_add", (data) => {
            setImageDatas([...imageDatas, data]);
        });

        socket.on("image_update", (data) => {
            setImageDatas(imageDatas.map((imageData, i) => {
                if (i == data.index) {
                    return data.data;
                }

                return imageData;

            }))
        })
    })

    return {

    };
}