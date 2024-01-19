import { io } from "socket.io-client";

// for test
export const socket = io("http://localhost:3000");
// for deployment
// export const socket = io();