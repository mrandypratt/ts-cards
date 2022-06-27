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
    origin: "*",
  },
});

const log = (event: string, sessionId: string, socketId: string, lobbyId?: string, ...messages: string[]): void => {
  console.log(event);
  console.log(`--SessionID: ${sessionId}`)
  console.log(`--SocketID: ${socketId}`);
  if (lobbyId && (lobbyId !== "")) {
    console.log(`--LobbyId: ${lobbyId}`)
  }
  messages.forEach(message => console.log(`--${message}`));
  console.log("")
}

const PORT = process.env.port || 8787;

io.use((socket, next) => {
  let sessionId = socket.handshake.auth.sessionId;
  let session = sessionStore.findSession(sessionId)
  
  if (session && sessionId) {
    let lobbyId = gameStore.findGameBySessionId(sessionId)?.lobbyId;

    if (lobbyId) {
      socket.join(lobbyId)
      log("Session Restored", sessionId, socket.id, lobbyId)
    } else (
      log("Session Restored", sessionId, socket.id)
    )

    session.updateSocketId(socket.id);
    socket.emit(EVENTS.existingSession, gameStore.findGameBySessionId(sessionId))
    return next();
  }

  session = sessionStore.createSession(socket.id);
  log("Session Created", session.sessionId, socket.id);
  socket.emit(EVENTS.newSession, sessionStore.findSessionBySocketId(socket.id)?.sessionId)
  next();
});

io.on("connection", (socket) => {

  socket.on(EVENTS.addGameToStore, (gameData: GameDataType): void => {
    let sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId;
    gameStore.addGame(new Game(gameData))

    if (sessionId) {
      log("Game Added to Store", sessionId, socket.id)
    }
  })

  socket.on(EVENTS.updateView, (view: string) => {
    const sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId;
    
    if (sessionId) {
      gameStore.findPlayerBySessionId(sessionId)?.setView(view)
      log("View Updated", sessionId, socket.id)
    }
  })

  
  socket.on(EVENTS.exitLobby, (gameData: GameDataType) => {
    const lobbyId = gameData.lobbyId;
    const sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId;

    // Delete Game from Store
    gameStore.deleteGame(gameData.id);

    if (sessionId) {
      log(`Game ${gameData.id} Deleted`, sessionId, socket.id);
    }

    // Remove Sockets from Lobby

    if (lobbyId) {
      io.to(lobbyId).emit(EVENTS.resetAllClients);
      io.socketsLeave(lobbyId)
      if (sessionId) {
        log("Lobby Exit", sessionId, socket.id, lobbyId)
      }
    }
  });

  socket.on(EVENTS.createLobby, (gameData: GameDataType): void => {
    const lobbyId = gameData.lobbyId;
    const sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId
    const currentGame = new Game(gameData);

    if (lobbyId && sessionId && currentGame) {
      socket.join(lobbyId);
      currentGame.setLobby(lobbyId);
      io.to(lobbyId).emit(EVENTS.updateClient, currentGame);
      gameStore.updateGame(currentGame);
      log(`Created Room`, sessionId, socket.id, lobbyId);
    }
  });
  
  socket.on(EVENTS.joinLobby, (gameData: GameDataType, playerData: PlayerDataType): void => {
    const lobbyId = gameData.lobbyId;
    const sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId
    const currentGame = gameStore.findGameByLobbyId(gameData.lobbyId)

    // Delete Prior Game
    gameStore.deleteGame(gameData.id)

    if (sessionId) {
      log(`Game ${gameData.id} Deleted`, sessionId, socket.id);
    }

    // Create New Game

    if (currentGame && lobbyId && sessionId) {
      socket.join(lobbyId);
      currentGame.addPlayer(new Player("", playerData));
      io.to(lobbyId).emit(EVENTS.updateClient, currentGame);
      gameStore.updateGame(currentGame);
      log(`Joined Room`, sessionId, socket.id,lobbyId)
    } else {
      socket.emit(EVENTS.roomDoesNotExist, "error");
    }
  });

  socket.on(EVENTS.startRound, (gameData: GameDataType): void => {
    const lobbyId = gameData.lobbyId
    const currentGame = gameStore.findGameByLobbyId(lobbyId)
    const sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId;

    if (currentGame && lobbyId && sessionId) {
      currentGame.initializeRound();
      io.to(lobbyId).emit(EVENTS.updateClient, currentGame);
      gameStore.updateGame(currentGame);
      log(`Started Round ${currentGame.rounds.length}`, sessionId, socket.id, lobbyId)
    }
  });
  
  socket.on(EVENTS.playerSelection, (gameData: GameDataType): void => {
    const lobbyId = gameData.lobbyId;
    const sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId;
    const currentGame = new Game(gameData);
    
    if (lobbyId && sessionId && currentGame) {
      let selectedCardText = currentGame.round?.getSelection(sessionId)?.text;

      if (selectedCardText) {
        log("Player Selected Card", sessionId, socket.id, lobbyId, selectedCardText)
      }
  
      if (currentGame.round?.allSelectionsMade()) {
        currentGame.updateViewsForJudgeRound();
        gameStore.updateGame(currentGame)
        log("Judge Round", sessionId, socket.id, lobbyId, `Current View: ${currentGame.getPlayerView(sessionId)}`)
      };
    
      io.to(lobbyId).emit(EVENTS.updateClient, currentGame);
    }


  });
  
  socket.on(EVENTS.winnerSelected, (gameData: GameDataType): void => {
    const lobbyId = gameData.lobbyId;
    const sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId;
    const currentGame = new Game(gameData);
    
    if (currentGame && sessionId && lobbyId) {
      currentGame.addRoundToRounds();
      currentGame.updateViewsForRoundResults();
      io.to(lobbyId).emit(EVENTS.updateClient, currentGame);
      gameStore.updateGame(gameData);
      log("Judge Selected Winner", sessionId, socket.id, lobbyId);
    }


  });
  
  socket.on(EVENTS.startNextRound, (gameData: GameDataType): void => {
    const lobbyId = gameData.lobbyId;
    const sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId;
    const currentGame = new Game(gameData);
    
    if (sessionId && lobbyId && currentGame) {
      log("Player Ready for Next Round", sessionId, socket.id, lobbyId);
      
      if (currentGame.readyForNextRound()) {
        currentGame.createNextRound();
        log("All Players Ready for Next Round", sessionId, socket.id, lobbyId)
      }
      
      io.to(lobbyId).emit(EVENTS.updateClient, currentGame);
      gameStore.updateGame(gameData);
    }
  });

  socket.on(EVENTS.startNewGame, (gameData: GameDataType): void => {
    const lobbyId = gameData.lobbyId;
    const sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId;
    const currentGame = new Game(gameData);

    if (lobbyId && sessionId && currentGame) {
      log(`Player Ready for Next Round`, sessionId, socket.id, lobbyId);
      
      if (currentGame.readyForNextGame()) {
        currentGame.resetGame();
        log(`All Players Ready for Next Round`, sessionId, socket.id, lobbyId);
      }

      io.to(lobbyId).emit(EVENTS.updateClient, currentGame);
      gameStore.updateGame(gameData);
    }
  });

  socket.on("disconnect", () => {
    const sessionId = sessionStore.findSessionBySocketId(socket.id)?.sessionId;
    
    if (sessionId) {
      log(`Client Disconnected`, sessionId, socket.id);
    }
  });
});


httpServer.listen(PORT, () => {
  console.log("Listening on PORT: " + PORT);
  console.log("")
  console.log('-------------')
  console.log("")
});