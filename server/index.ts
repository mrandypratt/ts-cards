import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "../client/src/data/classes/Game";
import { Player } from "../client/src/data/classes/Player";
import { sessionStore } from "./SessionStore";
import { gameStore } from "./GameStore";
import { EVENTS } from "../client/src/data/constants/socketEvents";
import { GameDataType, PlayerDataType } from "../client/src/data/types/ClassTypes";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8787",
  },
});

const PORT = process.env.port || 8787;

io.use((socket, next) => {
  const sessionId = socket.handshake.auth.sessionId;

  if (sessionId) {
    const session = sessionStore.findSession(sessionId);
    if (session) {
      gameStore.updateSocketId(session.socketId, socket.id);
      session.socketId = socket.id;
      console.log(`Session Updated!\n--Session: ${sessionStore.findSessionBySocketId(socket.id)?.sessionId}\n--SocketID: ${socket.id}`)
      socket.emit(EVENTS.existingSession, gameStore.findGameBySocketId(socket.id))
      return next();
    }
  }

  sessionStore.createSession(socket.id);
  console.log(`Session Added!\n--Session: ${sessionStore.findSessionBySocketId(socket.id)?.sessionId}\n--SocketID ${socket.id}`);
  socket.emit(EVENTS.newSession, sessionStore.findSessionBySocketId(socket.id)?.sessionId)
  next();
});

io.on("connection", (socket) => {

  console.log(`Client ${socket.id} connected`);

  socket.on(EVENTS.addGameToStore, (gameData: GameDataType): void => {
    gameStore.addGame(new Game(gameData))
  })


  socket.on(EVENTS.updateView, (view: string) => {
    gameStore.findPlayerBySocketId(socket.id)?.setView(view);
  })

  
  socket.on(EVENTS.createLobby, (gameData: GameDataType): void => {
    socket.join(gameData.lobbyId);
    console.log(`Client ${socket.id} created Room ${gameData.lobbyId}`);
    gameStore.setLobbyId(gameData.lobbyId, socket.id);
    gameStore.updatePlayer(gameData, socket.id);
    io.to(gameData.lobbyId).emit(EVENTS.updateClient, gameStore.findGameByLobbyId(gameData.lobbyId));
  });
  
  socket.on(EVENTS.joinLobby, (gameData: GameDataType, playerData: PlayerDataType): void => {
    const currentGame = gameStore.findGameByLobbyId(gameData.lobbyId)

    if (currentGame) {
      socket.join(gameData.lobbyId);
      console.log(`Client ${socket.id} joined Room ${gameData.lobbyId}`)
      currentGame.addPlayer(new Player("", playerData));

      io.to(gameData.lobbyId).emit(EVENTS.updateClient, currentGame);
    } else {
      socket.emit(EVENTS.roomDoesNotExist, "error");
    }
  });

  socket.on(EVENTS.startRound, (gameData: GameDataType): void => {
    const currentGame = gameStore.findGameByLobbyId(gameData.lobbyId)

    if (currentGame) {
      currentGame.initializeRound();
      console.log("Round Started")
      io.to(gameData.lobbyId).emit(EVENTS.updateClient, currentGame);
    }
  });
  
  socket.on(EVENTS.playerSelection, (gameData: GameDataType): void => {
    gameStore.updatePlayer(gameData, socket.id);
    console.log("Selection Made")

    const currentGame = gameStore.findGameByLobbyId(gameData.lobbyId)

    if (currentGame && currentGame.round?.allSelectionsMade()) {
      console.log("Index.ts: All Selections Made")
      currentGame.updateViewsForJudgeRound();
      console.log("Moving to Judge Round")
    };

    io.to(gameData.lobbyId).emit(EVENTS.updateClient, currentGame);
    
  });
  
  socket.on(EVENTS.winnerSelected, (gameData: GameDataType): void => {
    gameStore.updatePlayer(gameData, socket.id);
    console.log("Winner Selected: Showing Results");

    const currentGame = gameStore.findGameByLobbyId(gameData.lobbyId)

    if (currentGame) {
      currentGame.addRoundToRounds();
      currentGame.updateViewsForRoundResults();
    }

    io.to(gameData.lobbyId).emit(EVENTS.updateClient, currentGame);
  });
  
  socket.on(EVENTS.startNextRound, (gameData: GameDataType): void => {
    gameStore.updatePlayer(gameData, socket.id);
    console.log(`Client ${socket.id} ready for next round`);

    const currentGame = gameStore.findGameByLobbyId(gameData.lobbyId)
  
    if (currentGame && currentGame.readyForNextRound()) {
      currentGame.createNextRound();
    }

    io.to(gameData.lobbyId).emit(EVENTS.updateClient, currentGame);
  });

  socket.on(EVENTS.startNewGame, (gameData: GameDataType): void => {
    gameStore.updatePlayer(gameData, socket.id);
    console.log(`Client ${socket.id} ready for next game`);
  
    const currentGame = gameStore.findGameByLobbyId(gameData.lobbyId)

    if (currentGame && currentGame.readyForNextGame()) {
      currentGame.resetGame();
    }

    io.to(gameData.lobbyId).emit(EVENTS.updateClient, currentGame);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});



httpServer.listen(PORT, () => {
  console.log("Listening on PORT: " + PORT);
});