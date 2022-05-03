import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "../client/src/data/classes/Game";
import { Player } from "../client/src/data/classes/Player";
import { EVENTS } from "../client/src/data/constants/socketEvents";
import { GameDataType, PlayerDataType } from "../client/src/data/types/ClassTypes";

const httpServer = createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Hello, World!</h1>')
});

const io = new Server(httpServer, {});
const PORT = process.env.port || 8787;

type GameStore = {
  [lobbyId: string]: Game;
}

const gameStore: GameStore = {};

io.on("connection", (socket) => {

  console.log(`Client ${socket.id} connected`);

  socket.on(EVENTS.createGame, async (gameData: GameDataType): Promise<void> => {
    await socket.join(gameData.lobbyId);
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
    console.log("Selection Made")

    if (gameStore[gameData.lobbyId].round?.allSelectionsMade()) {
      console.log("Index.ts: All Selections Made")
      gameStore[gameData.lobbyId].updateViewsForJudgeRound();
      console.log("Moving to Judge Round")
    };

    io.to(gameData.lobbyId).emit(EVENTS.updateClient, gameStore[gameData.lobbyId]);
    
  });
  
  socket.on(EVENTS.winnerSelected, (gameData: GameDataType): void => {
    gameStore[gameData.lobbyId] = new Game(gameData);
    console.log("Winner Selected: Showing Results");

    gameStore[gameData.lobbyId].addRoundToRounds();
    gameStore[gameData.lobbyId].updateViewsForRoundResults();
    io.to(gameData.lobbyId).emit(EVENTS.updateClient, gameStore[gameData.lobbyId]);
  });
  
  socket.on(EVENTS.startNextRound, (gameData: GameDataType): void => {
    gameStore[gameData.lobbyId] = new Game(gameData);
    console.log(`Client ${socket.id} ready for next round`);
  
    if (gameStore[gameData.lobbyId].readyForNextRound()) {
      gameStore[gameData.lobbyId].createNextRound();
    }

    io.to(gameData.lobbyId).emit(EVENTS.updateClient, gameStore[gameData.lobbyId]);
  });

  socket.on(EVENTS.startNewGame, (gameData: GameDataType): void => {
    gameStore[gameData.lobbyId] = new Game(gameData);
    console.log(`Client ${socket.id} ready for next game`);
  
    if (gameStore[gameData.lobbyId].readyForNextGame()) {
      gameStore[gameData.lobbyId].resetGame();
    }

    io.to(gameData.lobbyId).emit(EVENTS.updateClient, gameStore[gameData.lobbyId]);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});



httpServer.listen(PORT, () => {
  console.log("Listening on PORT: " + PORT);
});