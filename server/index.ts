import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "../client/src/data/classes/Game";
import { Player } from "../client/src/data/classes/Player";
import { EVENTS } from "../client/src/data/constants/socketEvents";
import { GameDataType, PlayerDataType } from "../client/src/data/types/ClassTypes";

const httpServer = createServer();
const io = new Server(httpServer, {});

type GameStore = {
  [lobbyId: string]: Game;
}

const gameStore: GameStore = {};

io.on("connection", (socket) => {

  console.log(`Client ${socket.id} connected`);

  socket.on(EVENTS.createGame, (gameData: GameDataType): void => {
    socket.join(gameData.lobbyId);
    console.log(`Client ${socket.id} created Room ${gameData.lobbyId}`);
    gameStore[gameData.lobbyId] = new Game(gameData);
    io.to(gameData.lobbyId).emit(EVENTS.updateClient, gameStore[gameData.lobbyId]);
  });
  
  socket.on(EVENTS.joinRoom, (gameData: GameDataType, playerData: PlayerDataType, socketId: string): void => {
    if (gameStore[gameData.lobbyId]) {
      socket.join(gameData.lobbyId);
      console.log(`Client ${socket.id} joined Room ${gameData.lobbyId}`)
      gameStore[gameData.lobbyId].addPlayer(new Player("", playerData));
      io.to(gameData.lobbyId).emit(EVENTS.updateClient, gameStore[gameData.lobbyId]);
    } else {
      socket.emit(EVENTS.roomDoesNotExist, "error");
    }
  });

  socket.on(EVENTS.startRound, (gameData: GameDataType): void => {
    gameStore[gameData.lobbyId].initializeRound();
    console.log("Round Started")
    io.to(gameData.lobbyId).emit(EVENTS.updateClient, gameStore[gameData.lobbyId]);
  });
  
  socket.on(EVENTS.playerSelection, (gameData: GameDataType): void => {
    gameStore[gameData.lobbyId] = new Game(gameData);

    if (gameStore[gameData.lobbyId].round?.allSelectionsMade()) {
      gameStore[gameData.lobbyId].updateViewsForJudgeRound();
    };

    console.log("Moving to Judge Round")
    io.to(gameData.lobbyId).emit(EVENTS.updateClient, gameStore[gameData.lobbyId]);

  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

httpServer.listen(4000, () => {
  console.log("Listening on PORT: " + 4000);
});