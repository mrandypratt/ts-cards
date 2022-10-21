import { Socket } from "socket.io";
import { EVENTS } from "../../client/src/data/constants/EVENTS";
import { sessionStore } from "../data/SessionStore";

const updateView = (socket: Socket, view: string): void => {
  const session = sessionStore.findSessionBySocketId(socket.id);
  session?.updateView(view);
  
  socket.emit(EVENTS.server.updateView, view)
}

export default updateView;