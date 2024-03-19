import { redirect as action} from "react-router-dom";

async function redirect(response) {

    const status = response.status;
    
    switch (status) {
        case 200:
            return action(`/${response.roomId}`);

        case 408:
            return {status: status, statusText: "Server is not responding"};
    }
}

export default redirect;
