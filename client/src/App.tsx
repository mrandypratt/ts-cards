/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { VIEWS } from "./data/constants/VIEWS";

import { Home } from "./views/Home";
import { GettingStarted } from "./views/info/GettingStarted";
import { CreateGame } from "./views/host/CreateGame";
import { InviteParticipants } from "./views/host/InviteParticipants";
import { JoinLobby } from "./views/guest/JoinLobby";
import { WaitingForHost } from "./views/guest/WaitingForHost";
import { EVENTS } from "./data/constants/EVENTS";
import { PlayerTurn } from "./views/player/PlayerTurn";
import { JudgeWaitingForPlayers } from "./views/judge/JudgeWaitingForPlayers";
import { JudgeTurn } from "./views/judge/JudgeTurn";
import { PlayerSelectionMade } from "./views/player/PlayerSelectionMade";
import { PlayerWaitingForJudge } from "./views/player/PlayerWaitingForJudge";
import { RoundResults } from "./views/results/RoundResults";
import { GameResults } from "./views/results/GameResults";
import { WaitingForNextRound } from "./views/results/WaitingForNextRound";
import { WaitingForNextGame } from "./views/results/WaitingForNextGame";
import socket from "./socket";
import { GameDataType } from "./data/types/ClassTypes";

export const App = (): JSX.Element => {
  
  const [view, setView] = useState("");
  const [game, setGame] = useState<GameDataType | null>(null)
  
  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");

    if (sessionId) {
      socket.auth = { sessionId };
    }

    socket.connect();

    socket.on(EVENTS.server.newSession, (sessionId: string) => {
      sessionStorage.setItem("sessionId", sessionId);
      setView(VIEWS.home)
      setGame(null);
    })

    socket.on(EVENTS.server.updateView, (view: string) => {
      console.log(`View Updated ${view}`)
      setView(view);
    })

    socket.on(EVENTS.server.updateGame, (gameData: GameDataType | null) => {
      setGame(gameData)
    })

    socket.on(EVENTS.server.updateClient, (gameData: GameDataType | null, view: string) => {
      setGame(gameData)
      setView(view);
    })
  }, [])

  const sessionId = sessionStorage.getItem("sessionId");

  if (sessionId) {
    if (view === VIEWS.home) {      
      return (
        <Home
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      )
    }
      
    if (view === VIEWS.gettingStarted) {
      return (
        <GettingStarted
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      )
    }
        
    if (view === VIEWS.host.createLobby) {
      return (
        <CreateGame
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
  
    if (view === VIEWS.host.inviteParticipants) {
      return (
        <InviteParticipants
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
    
    if (view === VIEWS.guest.joinLobby) {
      return (
        <JoinLobby
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
  
    if (view === VIEWS.guest.waitingForHost) {
      return (
        <WaitingForHost
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
  
    if (view === VIEWS.player.turn) {
      return (
        <PlayerTurn
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
  
    if (view === VIEWS.player.selectionMade) {
      return (
        <PlayerSelectionMade
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
    
    if (view === VIEWS.player.waitingForJudge) {
      return (
        <PlayerWaitingForJudge
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
  
    if (view === VIEWS.judge.waitingforSelections) {
      return (
        <JudgeWaitingForPlayers
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
  
    if (view === VIEWS.judge.turn) {
      return (
        <JudgeTurn
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
    
    if (view === VIEWS.results.round) {
      return (
        <RoundResults
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }

    if (view === VIEWS.results.game) {
      return (
        <GameResults
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
    
    if (view === VIEWS.results.waitingForNextRound) {
      return (
        <WaitingForNextRound
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
  
    if (view === VIEWS.results.waitingForNextGame) {
      return (
        <WaitingForNextGame
          game={game}
          setGame={setGame}
          socket={socket}
          sessionId={sessionId}
        />
      );
    }
  }

  return (
    <div></div>
  )
}
