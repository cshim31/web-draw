import { socket } from "../common/lib/socket";
import { redirect } from "react-router-dom";

export async function createRoom(userName) {

    socket.emit("create_room", {userName: userName});

    socket.once("ack_create_room", ({ response, roomId }) => {
        redirect(`/${roomId}`);
        return response;
    })
}

export async function joinRoom(roomId, userName) {

    socket.emit("join_room", {roomId: roomId, userName: userName});

    socket.once("ack_join", ({ response, roomId }) => {
        redirect(`/${roomId}`);
        return response;
    })
}
