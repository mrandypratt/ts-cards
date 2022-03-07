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

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export const App = (): JSX.Element => {
  
  const [game, setGame] = useState(new Game()); 
  
  socket.on("connect", () => {
    game.addPlayer(socket?.id);
    setGame(game.clone())
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

  return (
    <div>Error</div>
  )
}
