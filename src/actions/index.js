import { socket } from "../common/lib/socket";
import { redirect } from "react-router-dom";
export async function createRoomId(username) {

    socket.emit("create_room", {username: username});

    socket.once("create_room_id", (roomId) => {
        return redirect(`/${roomId}`);
    })
}
