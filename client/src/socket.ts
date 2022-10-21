import { io } from "socket.io-client";
import { getServerURL } from "./data/functions/getURL";

const socket = io(getServerURL(), { autoConnect: false, transports: ["websocket"] });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
