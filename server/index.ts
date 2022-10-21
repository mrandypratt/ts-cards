// Use HTTPS for prod, HTTP for dev
import express from "express";
import mongoose from "mongoose"
import apiroute from "./routes/feedback";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io"
import { EVENTS } from "../client/src/data/constants/EVENTS"
import { CardDataType, GameDataType } from "../client/src/data/types/ClassTypes";
import singlePlayer from "./socketRoutes/singlePlayer";
import multiPlayer from "./socketRoutes/multiPlayer";
import lobbyEvents from "./socketRoutes/leaveLobby";
import sessionMiddleware from "./socketRoutes/sessionMiddleware";
import updateView from "./socketRoutes/updateView";
import { getMongoURI } from "./database/config.database";
require('dotenv').config();

const mongoURI = getMongoURI()

mongoose
  .connect(mongoURI)
  .then(() => {
    // Express Server
    const app = express();
    app.use(cors())
    app.use(express.json())
    app.use("/api", apiroute)

    // HTTP Server with Socket
    const server = createServer(app);
    const PORT = process.env.port || 8787;
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });  
    
    io.use(sessionMiddleware);
    
    io.on("connection", (socket) => {
    
      socket.on(EVENTS.client.updateView, (view: string) => {
        updateView(socket, view);
      });

      socket.on(EVENTS.client.singlePlayer.createLobby, (name: string, NSFW: boolean): void => {
        singlePlayer.createLobby(socket, name, NSFW);
      });

      socket.on(EVENTS.client.singlePlayer.startFirstRound, (): void => {
        singlePlayer.startFirstRound(socket);
      });

      socket.on(EVENTS.client.singlePlayer.playerSelection, (selectedCard: CardDataType): void => {
        singlePlayer.humanPlayerMakesSelection(socket, selectedCard);
      });
      
      socket.on(EVENTS.client.singlePlayer.judgeSelection, (selectedCard: CardDataType): void => {
        singlePlayer.humanJudgeMakesSelection(socket, selectedCard);
      });
      
      socket.on(EVENTS.client.singlePlayer.startNextRound, (): void => {
       singlePlayer.humanStartsNextRound(socket);
      });
    
      socket.on(EVENTS.client.singlePlayer.startNextGame, (gameData: GameDataType): void => {
        singlePlayer.humanStartsNextGame(socket);
      });
    
      socket.on(EVENTS.client.multiPlayer.createLobby, (name: string, NSFW: boolean): void => {
        multiPlayer.createLobby(socket, io, name, NSFW);
      });
      
      socket.on(EVENTS.client.multiPlayer.joinLobby, (lobbyId: string, name: string): void => {
        multiPlayer.joinLobby(socket, lobbyId, name);
      });
    
      socket.on(EVENTS.client.multiPlayer.startFirstRound, (): void => {
        multiPlayer.startFirstRound(socket, io);
      });
      
      socket.on(EVENTS.client.multiPlayer.playerSelection, (selectedCard: CardDataType): void => {
        multiPlayer.playerSelection(socket, io, selectedCard);
      });
      
      socket.on(EVENTS.client.multiPlayer.judgeSelection, (selectedCard: CardDataType): void => {
        multiPlayer.judgeSelection(socket, io, selectedCard);
      });
      
      socket.on(EVENTS.client.multiPlayer.startNextRound, (): void => {
        multiPlayer.startNextRound(socket, io);
      });
    
      socket.on(EVENTS.client.multiPlayer.startNextGame, (gameData: GameDataType): void => {
        multiPlayer.startNextGame(socket, io);
      });
    
      socket.on(EVENTS.client.deleteLobby, () => {
        lobbyEvents.deleteLobby(socket, io);
      });
    
      socket.on(EVENTS.client.exitLobby, () => {
        lobbyEvents.exitLobby(socket, io);
      });
    
      socket.on("disconnect", () => {
        console.log("Disconnected");
      });
    });
    
  server.listen(PORT, () => {
    console.log("Listening on PORT: " + PORT);
    console.log("")
    console.log('-------------')
    console.log("")
  });
})
