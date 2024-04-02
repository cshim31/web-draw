import Board from "../Board";
import Palette from "../Palette";
import { useEffect, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { DrawContext } from "../Context/DrawContext";
import useRoom from "../hooks/useRoom";

const DrawPage = () => {
    const roomId = useLoaderData(); 

    const { setRoomId } = useContext(DrawContext);

    const { response } = useRoom();

    useEffect(() => {
        setRoomId(roomId);
    }, roomId)

    return (
        <>
            <Board/>
            <Palette/>
        </>
    )
}

export default DrawPage;