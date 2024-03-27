import { socket } from "../common/lib/socket";

export async function createRoom(userName) {
    
    socket.emit("create_room", { userName: userName }, (response) => {
        return response;
    });
}

export async function joinRoom(roomId, userName) {
    socket.emit("join_room", {roomId: roomId, userName: userName}, (response) => {
        return response;
    });

    return {status: 408};
}
