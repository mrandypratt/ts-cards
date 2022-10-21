import { io } from "socket.io-client";

let URL;

switch (process.env.REACT_APP_STAGE) {
  case "prod":
    URL = "52.20.228.225:8787"
    break;
  case "dev":
    URL = "http://localhost:8787";
    break;
  case "test":
    URL = "54.85.124.217:8787";
    break;
  default:
    URL = "http://localhost:8787";
}

const socket = io(URL, { autoConnect: false, transports: ["websocket"] });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
