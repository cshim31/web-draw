async function redirect(response) {

    const status = response.status;
    
    switch (status) {
        case 200:
            window.location.replace("/${response.roomId}");
            return {status: status, statusText: "Success"};

        case 408:
            return {status: status, statusText: "Server is not responding"};
    }
}

export default redirect;
