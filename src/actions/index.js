import { socket } from "../common/lib/socket";
import { redirect } from "react-router-dom";

export async function createRoom(userName) {

    socket.emit("create_room", {userName: userName});

    socket.once("create_room_id", (roomId) => {
        return redirect(`/${roomId}`);
    })
}

export async function joinRoom(userName) {

    socket.emit("create_room", {userName: userName});

    socket.once("create_room_id", (roomId) => {
        return redirect(`/${roomId}`);
    })
}
