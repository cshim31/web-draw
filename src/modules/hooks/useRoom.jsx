import { useContext, useEffect } from "react";
import { DrawContext } from "../Context/DrawContext";
import { useLoaderData } from "react-router-dom";
import { socket } from "../../common/lib/socket";

export default function useRoom() {

    let response;
    
    const loader = useLoaderData(); 
    const userName = loader["userName"];
    const roomId = loader["roomId"];

    const { setUserName, setRoomId } = useContext(DrawContext);

    useEffect(() => {
        socket.emit("join_room", {roomId: roomId, userName: userName}, (response) => {
            // TODO: Fix error here
            response = response;
        });
    }, [])

    useEffect(() => {
        setUserName(userName);
        setRoomId(roomId);
    })

    return {
        response
    };
};