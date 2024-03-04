import { createRoomId, getRoomId } from "../actions";

export async function createRoomAction() {
    const roomId = await createRoomId();

    /* 
        set room id and send create room request to server
    */

    return { roomId };
}

export async function joinRoomAction() {
    const roomId = await getRoomId();

    if (!roomId) {
        return 
    }

    /* 
        set room id and send join request to server
    */
    return { roomId };
}

export default function Root() {
    return (
        <>
            <div>
                
            </div>
        </>
    )
}