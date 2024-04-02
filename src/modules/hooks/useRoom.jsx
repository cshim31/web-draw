import { useContext } from "react";
import { useInterval } from "react-use";
import { DrawContext } from "../Context/DrawContext";
import { socket } from "../../common/lib/socket";

export default function useRoom() {

    let response;

    const { roomId, userName } = useContext(DrawContext);

    useInterval(() => {
        socket.emit("join_room", {roomId: roomId, userName: userName}, (response) => {
            response = response;
        });
    }, 1000)

    return {
        response
    };
};