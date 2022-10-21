import { Server, Socket } from "socket.io";
import { EVENTS } from "../../client/src/data/constants/EVENTS";
import { VIEWS } from "../../client/src/data/constants/VIEWS";
import { gameStore } from "../data/GameStore";
import { sessionStore } from "../data/SessionStore";


const deleteLobby = (socket: Socket, io: Server): void => {
  const session = sessionStore.findSessionBySocketId(socket.id);
  const game = gameStore.findGameBySessionId(session ? session.id : "");
  
  if (!(session && game)) return;

  game.players.forEach(player => {
    sessionStore.resetSession(player.sessionId);
    let socketId = sessionStore.getSocketId(player.sessionId);
    io.to(socketId).emit(EVENTS.server.updateClient, null, VIEWS.home)
    io.socketsLeave(game.id)
  })

  gameStore.deleteGame(game.id);
}

const exitLobby = (socket: Socket, io: Server): void => {
  const session = sessionStore.findSessionBySocketId(socket.id);
  const game = gameStore.findGameBySessionId(session ? session.id : "");

  if (!(session && game)) return;

  gameStore.removePlayerFromGame(session.id);
  
  socket.leave(game.id);
  io.to(game.id).emit(EVENTS.server.updateGame, game)
  sessionStore.resetSession(session.id)
  socket.emit(EVENTS.server.updateClient, null, VIEWS.home);
}

const lobbyEvents = {
  deleteLobby: deleteLobby,
  exitLobby: exitLobby
}

export default lobbyEvents;



