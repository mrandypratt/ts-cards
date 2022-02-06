import { useState } from "react";

import { EnterPlayersView } from "./views/EnterPlayersView"
import { SelectPlayerView } from "./views/SelectPlayerView"
import { PlayerView } from "./views/PlayerView";
import { JudgeView } from "./views/JudgeView";
import { DeclareWinnerView } from "./views/DeclareWinnerView";

import { StatefulGame } from "./data/classes/StatefulGame";

export default function App() {
  
  const [game, setGame] = useState(new StatefulGame());

  if (game.view === game.VIEWS.enterPlayers) {
    return (
      <EnterPlayersView 
        game={game}
        setGame={setGame} 
      />
    )
  }

  if (game.view === game.VIEWS.selectPlayer) {
    return (
      <SelectPlayerView
        game={game}
        setGame={setGame} 
      />
    );
  }
  
  if (game.getPlayerById(game.view)) {
    let player = game.getPlayerById(game.view);

    return (
      <PlayerView 
        player={player}
        game={game}
        setGame={setGame} 
      />
    );
  }

  if (game.view === game.VIEWS.judge) {
    return (
      <JudgeView
        game={game}
        setGame={setGame} 
      />
    );
  }

  if (game.view === game.VIEWS.declareWinner) {
    return (
      <DeclareWinnerView
        game={game}
        setGame={setGame} 
      />
    )
  }
}
