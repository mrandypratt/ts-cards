import { useState } from "react";
import { io } from "socket.io-client";

import { Game } from "./data/classes/Game";
import { VIEWS } from "./data/types/VIEWS";

import { Home } from "./views/Home";
import { GettingStarted } from "./views/info/GettingStarted";
import { CreateLobby } from "./views/host/CreateLobby";
import { InviteParticipants } from "./views/host/InviteParticipants";
import { JoinLobby } from "./views/guest/JoinLobby";
import { WaitingForHost } from "./views/guest/WaitingForHost";
import { EVENTS } from "./data/constants/socketEvents";
import { Player } from "./data/classes/Player";
import { PlayerTurn } from "./views/player/PlayerTurn";
import { JudgeWaitingForPlayers } from "./views/judge/JudgeWaitingForPlayers";
import { GameDataType } from "./data/types/ClassTypes";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export const App = (): JSX.Element => {
  
  const [game, setGame] = useState(new Game()); 
  
  socket.on("connect", () => {
    game.addPlayer(new Player(socket.id));
    setGame(game.clone())
  })

  socket.on(EVENTS.updateClient, (updatedGame: GameDataType) => {
    setGame(new Game(updatedGame));
  })

  if (game.currentPlayerView(socket.id) === VIEWS.home) {
    return(
      <Home
        game={game}
        setGame={setGame}
        socket={socket}
      />
    )
  }
  
  if (game.currentPlayerView(socket.id) === VIEWS.gettingStarted) {
    return(
      <GettingStarted
        game={game}
        setGame={setGame}
        socket={socket}
      />
    )
  }

  if (game.currentPlayerView(socket.id) === VIEWS.host.createLobby) {
    return (
      <CreateLobby
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  if (game.currentPlayerView(socket.id) === VIEWS.host.inviteParticipants) {
    return (
      <InviteParticipants
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }
  
  if (game.currentPlayerView(socket.id) === VIEWS.guest.joinLobby) {
    return (
      <JoinLobby
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  if (game.currentPlayerView(socket.id) === VIEWS.guest.waitingForHost) {
    return (
      <WaitingForHost
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  if (game.currentPlayerView(socket.id) === VIEWS.player.turn) {
    return (
      <PlayerTurn
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }
  
  if (game.currentPlayerView(socket.id) === VIEWS.judge.waitingforSelections) {
    return (
      <JudgeWaitingForPlayers
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  return (
    <div>Error</div>
  )
}
