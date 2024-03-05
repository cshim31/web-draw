import { createRoomId, joinRoomId } from "../actions";

export async function action(actionArg) {
    const formData = await actionArg.request.formData();
    const formId = formData.get("form-id");

    switch (formId) {
        case "create-room":
            await createRoomId();

        case "join-room":
            await joinRoomId(actionArg);

        default:
        // Form was submitted without an id
        // What to do... throw or return error? Ignore? You decide.
    }
}


export default function Root() {
    return (
        <>
            <div>
                
            </div>
        </>
    )
}