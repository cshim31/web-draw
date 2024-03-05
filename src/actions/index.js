import { socket } from "../common/lib/socket";
import { redirect } from "react-router-dom";
export async function createRoomId(actionArg) {
    const formData = await actionArg.request.formData();
    const userId = formData.get("user-id");

    socket.emit("create_room", {userId: userId});

    socket.once("create_room_id", (roomId) => {
        return redirect(`/${roomId}`);
    })
}

export async function joinRoomId(actionArg) {
    const formData = await actionArg.request.formData();
    const userId = formData.get("user-id");
    const roomId = formData.get("room-id");

    socket.emit("join_room", {userId: userId, roomId: roomId});

    socket.once("join_room_id", (roomId) => {
        return redirect(`/${roomId}`);
    })
}