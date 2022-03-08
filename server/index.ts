import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "../client/src/data/classes/Game";
import { Player } from "../client/src/data/classes/Player";
import { EVENTS } from "../client/src/data/constants/socketEvents";

const httpServer = createServer();
const io = new Server(httpServer, {});

type games = {
  [lobbyId: string]: Game;
}

const games: games = {};

io.on("connection", (socket) => {

  console.log(`Client ${socket.id} connected`);

  socket.on(EVENTS.createGame, (game: Game) => {
    socket.join(game.lobbyId);
    games[game.lobbyId] = Object.assign(new Game(), game);
    console.log(`Client ${socket.id} created Room ${game.lobbyId}`)
    io.to(game.lobbyId).emit(EVENTS.updateClient, games[game.lobbyId]);
  })
  
  socket.on(EVENTS.joinRoom, (game: Game, player: Player) => {
    console.log(games)
    console.log(games[game.lobbyId])
    console.log(game)
    if (games[game.lobbyId]) {
      socket.join(game.lobbyId);
      console.log(`Client ${socket.id} joined Room ${game.lobbyId}`)
      games[game.lobbyId].addPlayer(player);
      console.log(games[game.lobbyId])
      io.to(game.lobbyId).emit(EVENTS.updateClient, games[game.lobbyId]);
    } else {
      socket.emit(EVENTS.roomDoesNotExist, "error");
    }
  })

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

httpServer.listen(4000, () => {
  console.log("Listening on PORT: " + 4000);
});