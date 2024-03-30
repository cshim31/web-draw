import { socket } from "../common/lib/socket";
import redirect from "../redirects";

export async function createRoom(userName) {
    
    socket.emit("create_room", { userName: userName }, (response) => {
        return redirect(response);
    });

    return 1;
}

export async function joinRoom(roomId, userName) {
    socket.emit("join_room", {roomId: roomId, userName: userName}, (response) => {
        return redirect(response);
    });

    return 1;
}
