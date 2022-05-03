/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
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
import { JudgeTurn } from "./views/judge/JudgeTurn";
import { PlayerSelectionMade } from "./views/player/PlayerSelectionMade";
import { PlayerWaitingForJudge } from "./views/player/PlayerWaitingForJudge";
import { RoundResults } from "./views/results/RoundResults";
import { WaitingForNextRound } from "./views/results/WaitingForNextRound";
import { WaitingForNextGame } from "./views/results/WaitingForNextGame";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

export const App = (): JSX.Element => {
  
  const [game, setGame] = useState(new Game()); 

  console.log(game);
  
  useEffect(() => {
    socket.on("connect", () => {
      game.addPlayer(new Player(socket.id));
      setGame(game.clone())
    })
  
    socket.on(EVENTS.updateClient, (updatedGameData: GameDataType) => {
      if (JSON.stringify(game) !== JSON.stringify(updatedGameData)) {
        setGame(new Game(updatedGameData));
      }
    })
  }, [])

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

  if (game.currentPlayerView(socket.id) === VIEWS.player.selectionMade) {
    return (
      <PlayerSelectionMade
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }
  
  if (game.currentPlayerView(socket.id) === VIEWS.player.waitingForJudge) {
    return (
      <PlayerWaitingForJudge
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

  if (game.currentPlayerView(socket.id) === VIEWS.judge.turn) {
    return (
      <JudgeTurn
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }
  
  if (game.currentPlayerView(socket.id) === VIEWS.results.round) {
    return (
      <RoundResults
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }
  
  if (game.currentPlayerView(socket.id) === VIEWS.results.waitingForNextRound) {
    return (
      <WaitingForNextRound
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  if (game.currentPlayerView(socket.id) === VIEWS.results.waitingForNextGame) {
    return (
      <WaitingForNextGame
        game={game}
        setGame={setGame}
        socket={socket}
      />
    );
  }

  return (
    <div>Error: No View on App</div>
  )
}
