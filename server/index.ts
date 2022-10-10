// Use HTTPS for prod, HTTP for dev
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io"
import { sessionStore } from "./data/SessionStore";
import { gameStore } from "./data/GameStore";
import { EVENTS } from "../client/src/data/constants/EVENTS"
import { CardDataType, GameDataType } from "../client/src/data/types/ClassTypes";
import { VIEWS } from "../client/src/data/constants/VIEWS"
import { Game } from "./data/classes/Game";
import { Player } from "./data/classes/Player";
import { log } from "./functions/log"
import mongoose from "mongoose"
import { Console } from "console";
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || "";

mongoose
  .connect(mongoURI)
  .then(() => {
    // Express Server
    const app = express();
    app.use(cors())
    app.use(express.json())
    
    // HTTP Server with Socket
    const server = createServer(app);
    const PORT = process.env.port || 8787;
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
    
    app.post("/api/feedback", (req, res) => {
      console.log(req.body)
      res.status(201).send({accepted: true})
    });
    
    
    io.use((socket, next) => {
      let sessionId = socket.handshake.auth.sessionId;
      let session = sessionStore.findSession(sessionId)
    
      // User has logged in Before and Has Existing Session in Memory
      if (session && sessionId) {
        const game = gameStore.findGameBySessionId(sessionId);
    
        if (game) {
          socket.join(game.id)
        } 
        
        log("Session Restored", sessionId, socket.id, game?.id)
        session.updateSocketId(socket.id);
        socket.emit(EVENTS.server.updateClient, game, session.view)
        return next();
    
    
      }
    
      session = sessionStore.createSession(socket.id, null, VIEWS.home);
      log("Session Created", session.id, socket.id);
      sessionStore.logSessions();
      socket.emit(EVENTS.server.newSession, sessionStore.findSessionBySocketId(socket.id)?.id)
      next();
    });
    
    io.on("connection", (socket) => {
    
      socket.on(EVENTS.client.updateView, (view: string) => {
    
        const session = sessionStore.findSessionBySocketId(socket.id);
        console.log(session)
        session?.updateView(view);
        
        console.log("View Updated")
        console.log(session)
        socket.emit(EVENTS.server.updateView, view)
      })
    
      socket.on(EVENTS.client.createLobby, (name: string, NSFW: boolean): void => {
        const sessionId = sessionStore.findSessionBySocketId(socket.id)?.id;
        const nextView = VIEWS.host.inviteParticipants
        
        if (sessionId) {
          // Create Game and add to Game Store
          const game = new Game(null, new Player(null, sessionId, name), NSFW);
          gameStore.addGame(game);
          
          // Join Socket Room with Lobby ID
          socket.join(game.id);
    
          // Associate Session with Lobby ID
          sessionStore.findSession(sessionId)?.updateLobby(game.id)
    
          // Update Client's View on SessionStore
          sessionStore.findSession(sessionId)?.updateView(nextView)
    
          // Push all Updates to Client
          io.to(game.id).emit(EVENTS.server.updateClient, game, nextView)
        }
    
        gameStore.logGames();
      });
      
      socket.on(EVENTS.client.joinLobby, (lobbyId: string, name: string): void => {
        lobbyId = lobbyId.toUpperCase();
        const sessionId = sessionStore.findSessionBySocketId(socket.id)?.id;
        const nextView = VIEWS.guest.waitingForHost;
        const game = gameStore.findGameByLobbyId(lobbyId);
        
        if (sessionId && game) {
          // Add Player to Game in Game Store
          game.addPlayer(new Player(null, sessionId, name))
          
          // Join Socket Room with Lobby ID
          socket.join(game.id);
    
          // Associate Session with Lobby ID
          sessionStore.findSession(sessionId)?.updateLobby(game.id)
    
          // Update Client's View on SessionStore
          sessionStore.findSession(sessionId)?.updateView(nextView)
    
          // Update Game & View of Sender
          socket.emit(EVENTS.server.updateClient, game, nextView)
    
          // Push Game Updates to all other clients in lobby
          socket.to(lobbyId).emit(EVENTS.server.updateGame, game);
        } else {
          // Lobby ID must be invalid
          socket.emit(EVENTS.server.invalidLobbyId, lobbyId)
        }
    
        gameStore.logGames();
      });
    
      socket.on(EVENTS.client.startFirstRound, (): void => {
        const sessionId = sessionStore.findSessionBySocketId(socket.id)?.id;
        
        if (sessionId) {
          const game = gameStore.findGameBySessionId(sessionId)
          
          if (game) {
            // Randomize Player Order
            game.randomizePlayerOrder();
            
            // Load & Deal Cards into Game
            game.loadDeckIntoGame();
            game.dealCardsToPlayers()
            
            // Create Round
            game.createNewRound()
    
            console.log(game)
    
            // UPDATE VIEWS & CLIENTS
    
            // Judge Player 
            const judgePlayer = game.getJudgePlayer();
            const judgeView = VIEWS.judge.waitingforSelections;
            
            if (judgePlayer) {
              // Update View
              sessionStore.findSession(judgePlayer.sessionId)?.updateView(judgeView);
              
              // Emit Update to specific socket ID
              const judgeSessionId = sessionStore.getSocketId(judgePlayer.sessionId)
              io.to(judgeSessionId).emit(EVENTS.server.updateClient, game, judgeView);
            }
    
            // Non-Judge Players
            const players = game.getNonJudgePlayers();
            const playerView = VIEWS.player.turn;
    
            players.forEach((player) => {
              // Update View
              sessionStore.findSession(player.sessionId)?.updateView(playerView);
    
              // Emit Update to specific socket ID
              const playerSessionId = sessionStore.getSocketId(player.sessionId)
              io.to(playerSessionId).emit(EVENTS.server.updateClient, game, playerView);
            })
          }
        }
    
        gameStore.logGames();
      });
      
      socket.on(EVENTS.client.playerSelection, (selectedCard: CardDataType): void => {
        const session = sessionStore.findSessionBySocketId(socket.id)
        
        if (session) {
          const game = gameStore.findGameBySessionId(session.id);
          const round = game?.round;
          
          if (game && round) {
    
            // Select Card
            const player = game.getPlayer(session.id);
            player?.playCard(selectedCard)
    
            // UPDATE VIEWS & CLIENTS (Based on Card Selections)
    
            if (round.allSelectionsMade()) {
    
              round.randomizePlayerOrder();
    
              // Judge Player 
              const judgePlayer = game.getJudgePlayer();
              const judgeView = VIEWS.judge.turn;
              
              if (judgePlayer) {
                // Update View
                sessionStore.findSession(judgePlayer.sessionId)?.updateView(judgeView);
                
                // Emit Update to specific socket ID
                const judgeSessionId = sessionStore.getSocketId(judgePlayer.sessionId)
                io.to(judgeSessionId).emit(EVENTS.server.updateClient, game, judgeView);
              }
    
              // Non-Judge Players
              const players = game.getNonJudgePlayers();
              const playerView = VIEWS.player.waitingForJudge;
    
              players.forEach((player) => {
                // Update View
                sessionStore.findSession(player.sessionId)?.updateView(playerView);
    
                // Emit Update to specific socket ID
                const playerSessionId = sessionStore.getSocketId(player.sessionId)
                io.to(playerSessionId).emit(EVENTS.server.updateClient, game, playerView);
              })
            } else {
              // Update Current Client GameData & View to PlayerSelectionMade
              session.updateView(VIEWS.player.selectionMade)
              socket.emit(EVENTS.server.updateClient, game, session.view)
    
              // Update GameData of other Clients
              socket.to(game.id).emit(EVENTS.server.updateGame, game);
            }
          }
        }
      });
      
      socket.on(EVENTS.client.judgeSelection, (selectedCard: CardDataType): void => {
        const session = sessionStore.findSessionBySocketId(socket.id)
        
        if (session) {
          const game = gameStore.findGameBySessionId(session.id);
          const round = game?.round;
          
          if (game && round) {
            // Update Round Winner & Increment Wins on Round Player
            round.setWinner(selectedCard);
    
            // Increment Wins on Game Player
            game.incrementWins();
    
            // UPDATE VIEWS & CLIENTS (Based on Win Type)
    
            if (!game.winner) {
              // Update All Views and Game Data
              game.players.forEach(player => {
                sessionStore.findSession(player.sessionId)?.updateView(VIEWS.results.round)
              })
              io.to(game.id).emit(EVENTS.server.updateClient, game, VIEWS.results.round)
            } else {
              // Update All Views and Game Data
              game.players.forEach(player => {
                sessionStore.findSession(player.sessionId)?.updateView(VIEWS.results.game)
              })
              io.to(game.id).emit(EVENTS.server.updateClient, game, VIEWS.results.game)
            }
          }
        }
      });
      
      socket.on(EVENTS.client.startNextRound, (): void => {
        const session = sessionStore.findSessionBySocketId(socket.id)
        
        if (session) {
          const game = gameStore.findGameBySessionId(session.id);
          const round = game?.round;
          const player = game?.getPlayer(session.id);
          
          if (game && round && player) {
            // Mark Player as Ready 
            player.markAsReady()
    
            // Reset Player's "Ready" and Card Selected
            if (!game.allPlayersReady()) {
              
              // Update Game & Set View for Current Player
              sessionStore.findSession(player.sessionId)?.updateView(VIEWS.results.waitingForNextRound)
              socket.emit(EVENTS.server.updateClient, game, VIEWS.results.waitingForNextRound)
              
              // Update GameData of other Clients
              socket.to(game.id).emit(EVENTS.server.updateGame, game);
            } else {
              // Reset "Ready for next Round"
              game.players.forEach(player => {
                player.readyForNextRound = false;
                player.selectedCard = null;
              })
    
              // Update Player Hands for Round Selections
              game.resetPlayersAfterRound();
    
              // Increment Judge Index
              game.incrementJudgeIndex();
              
              // Move Round to Previous Rounds
              game.archiveRound();
    
              // Deal cards to all players
              game.dealCardsToPlayers();
    
              // Create New Round
              game.createNewRound();
    
              // UPDATE VIEWS & CLIENTS
    
              // Judge Player 
              const judgePlayer = game.getJudgePlayer();
              const judgeView = VIEWS.judge.waitingforSelections;
              
              if (judgePlayer) {
                // Update View
                sessionStore.findSession(judgePlayer.sessionId)?.updateView(judgeView);
                
                // Emit Update to specific socket ID
                const judgeSessionId = sessionStore.getSocketId(judgePlayer.sessionId)
                io.to(judgeSessionId).emit(EVENTS.server.updateClient, game, judgeView);
              }
    
              // Non-Judge Players
              const players = game.getNonJudgePlayers();
              const playerView = VIEWS.player.turn;
    
              players.forEach((player) => {
                // Update View
                sessionStore.findSession(player.sessionId)?.updateView(playerView);
    
                // Emit Update to specific socket ID
                const playerSessionId = sessionStore.getSocketId(player.sessionId)
                io.to(playerSessionId).emit(EVENTS.server.updateClient, game, playerView);
            })
            }
          }
        }
      });
    
      socket.on(EVENTS.client.startNextGame, (gameData: GameDataType): void => {
        const session = sessionStore.findSessionBySocketId(socket.id)
        
        if (session) {
          const game = gameStore.findGameBySessionId(session.id);
          const player = game?.getPlayer(session.id);
          
          if (game && player) {
            // Mark Player as Ready 
            player.markAsReady()
    
            // Reset Player's "Ready" and Card Selected
            if (!game.allPlayersReady()) {
              
              // Update Game & Set View for Current Player
              sessionStore.findSession(player.sessionId)?.updateView(VIEWS.results.waitingForNextGame)
              socket.emit(EVENTS.server.updateClient, game, VIEWS.results.waitingForNextGame)
              
              // Update GameData of other Clients
              socket.to(game.id).emit(EVENTS.server.updateGame, game);
            } else {
            
              // Update Player Hands for Round Selection
              game.reset();
    
              // Increment Judge Index
              game.incrementJudgeIndex();
    
              // Deal cards to all players
              game.dealCardsToPlayers();
    
              // Create New Round
              game.createNewRound();
    
              // UPDATE VIEWS & CLIENTS
    
              // Judge Player 
              const judgePlayer = game.getJudgePlayer();
              const judgeView = VIEWS.judge.waitingforSelections;
              
              if (judgePlayer) {
                // Update View
                sessionStore.findSession(judgePlayer.sessionId)?.updateView(judgeView);
                
                // Emit Update to specific socket ID
                const judgeSessionId = sessionStore.getSocketId(judgePlayer.sessionId)
                io.to(judgeSessionId).emit(EVENTS.server.updateClient, game, judgeView);
              }
    
              // Non-Judge Players
              const players = game.getNonJudgePlayers();
              const playerView = VIEWS.player.turn;
    
              players.forEach((player) => {
                // Update View
                sessionStore.findSession(player.sessionId)?.updateView(playerView);
    
                // Emit Update to specific socket ID
                const playerSessionId = sessionStore.getSocketId(player.sessionId)
                io.to(playerSessionId).emit(EVENTS.server.updateClient, game, playerView);
            })
            }
          }
        }
      });
    
      socket.on(EVENTS.client.deleteLobby, () => {
        const session = sessionStore.findSessionBySocketId(socket.id);
        
        if (session) {
          const game = gameStore.findGameBySessionId(session.id);
    
          if (game) {
            // Update Views & Lobby ID of all participants to Home
            game.players.forEach(player => {
              sessionStore.resetSession(player.sessionId);
              let socketId = sessionStore.getSocketId(player.sessionId);
              io.to(socketId).emit(EVENTS.server.updateClient, null, VIEWS.home)
              io.socketsLeave(game.id)
            })
    
            // Delete Game from Store
            gameStore.deleteGame(game.id);
          }
        }
    
        gameStore.logGames()
      });
    
      socket.on(EVENTS.client.exitLobby, () => {
        const session = sessionStore.findSessionBySocketId(socket.id);
    
        if (session) {
          const game = gameStore.findGameBySessionId(session.id);
    
          // Remove from Game
          gameStore.removePlayerFromGame(session.id);
          
          if (game) {
            // Remove from Socket Room
            socket.leave(game.id);
            io.to(game.id).emit(EVENTS.server.updateGame, game)
            sessionStore.resetSession(session.id)
            socket.emit(EVENTS.server.updateClient, null, VIEWS.home);
          }
        }
    
        gameStore.logGames();
      });
    
    
      socket.on("disconnect", () => {
        const session = sessionStore.findSessionBySocketId(socket.id);
        
        if (session) {
          log(`Client Disconnected`, session.id, socket.id);
        }
      });
    });
    
  server.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT);
    console.log("")
    console.log('-------------')
    console.log("")
  });
})
