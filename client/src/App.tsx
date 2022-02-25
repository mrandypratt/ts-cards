import { useState } from "react";
import { io } from "socket.io-client";

import { StatefulGame } from "./data/classes/StatefulGame";
import { Player } from "./data/classes/Player";

import { Home } from "./views/Home";
import { GettingStarted } from "./views/info/GettingStarted";
import { CreateLobby } from "./views/host/CreateLobby";
import { PlayerView } from "./views/PlayerView";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export const App = (): JSX.Element => {
  
  const [game, setGame] = useState(new StatefulGame());  

  if (game.view === game.VIEWS.home) {
    return(
      <Home
        game={game}
        setGame={setGame}
      />
    )
  }
  
  if (game.view === game.VIEWS.gettingStarted) {
    return(
      <GettingStarted
        game={game}
        setGame={setGame}
      />
    )
  }

  if (game.view === game.VIEWS.hostCreateLobby) {
    return (
      <CreateLobby
        game={game}
        setGame={setGame} 
      />
    );
  }
  
  if (typeof game.view === "number") {
    let player = game.getPlayerById(game.view);

    return (
      <PlayerView 
        player={player || new Player("Error")}
        game={game}
        setGame={setGame} 
      />
    );
  }

  return (
    <div>Error</div>
  )
}
