import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { EVENTS } from "../../client/src/data/constants/EVENTS";
import { VIEWS } from "../../client/src/data/constants/VIEWS";
import { gameStore } from "../data/GameStore";
import { sessionStore } from "../data/SessionStore";

const sessionMiddleware = (socket: Socket, next: (err?: ExtendedError | undefined) => void): void => {
  let sessionId = socket.handshake.auth.sessionId;
  let session = sessionStore.findSession(sessionId)

  if (session && sessionId) {
    const game = gameStore.findGameBySessionId(sessionId);

    if (game) socket.join(game.id)
    
    session.updateSocketId(socket.id);
    socket.emit(EVENTS.server.updateClient, game, session.view)
    return next();
  }

  session = sessionStore.createSession(socket.id, null, VIEWS.home);
  sessionStore.logSessions();
  socket.emit(EVENTS.server.newSession, sessionStore.findSessionBySocketId(socket.id)?.id);
  next();
}

export default sessionMiddleware;