import { Game } from "../data/classes/Game";
import { Player } from "../data/classes/Player";
import { Round } from "../data/classes/Round";
import { Session } from "../data/classes/Session";
import { gameStore } from "../data/GameStore";
import { sessionStore } from "../data/SessionStore";

interface SessionGame {
  session: Session,
  game: Game,
}

interface GameRound {
  game: Game,
  round: Round,
}

interface SessionGameRound {
  session: Session,
  game: Game,
  round: Round,
}

interface SessionGamePlayer {
  session: Session,
  game: Game,
  player: Player,
}

interface SessionGameRoundPlayer {
  session: Session,
  game: Game,
  round: Round,
  player: Player,
}

const session = (socketId: string): Session => {
  const session = sessionStore.findSessionBySocketId(socketId)

  if (!(session)) {
    console.error(`Session: ${session}\n`);
    throw new Error ("Cannot Validate Backend Data");
  }

  return session;
}

const game = (sessionId: string): Game => {
  const game = gameStore.findGameBySessionId(sessionId)

  if (!(game)) {
    console.error(`Game: ${game}\n`);
    throw new Error ("Cannot Validate Backend Data");
  }

  return game;
}

const round = (game: Game): Round => {
  const round = game?.round;

  if (!(round)) {
    console.error(`Round: ${round}`);
    throw new Error ("Cannot Validate Backend Data");
  }

  return round;
}

const sessionGame = (socketId: string): SessionGame => {
  const session = sessionStore.findSessionBySocketId(socketId);
  const game = gameStore.findGameBySessionId(session ? session.id : "");

  if (!(session && game)) {
    console.error(`Session: ${session}\nGame: ${game}\n`);
    throw new Error ("Issue with Backend Data Validity");
  }

  const backendData: SessionGame = { session: session, game: game }

  return backendData;
}


const gameRound = (sessionId: string): GameRound => {
  const game = gameStore.findGameBySessionId(sessionId)
  const round = game?.round;

  if (!(game && round)) {
    console.error(`Game: ${game}\nRound: ${round}`);
    throw new Error ("Cannot Validate Backend Data");
  }

  return {game, round};
}

const sessionGameRound = (socketId: string): SessionGameRound => {
  const session = sessionStore.findSessionBySocketId(socketId);
  const game = gameStore.findGameBySessionId(session ? session.id : "");
  const round = game?.round

  if (!(session && game && round)) {
    console.error(`Session: ${session}\nGame: ${game}\nRound: ${round}`);
    throw new Error ("Issue with Backend Data Validity");
  }

  const backendData: SessionGameRound = { session: session, game: game, round: round }

  return backendData;
}

const sessionGameRoundPlayer = (socketId: string): SessionGameRoundPlayer => {
  const session = sessionStore.findSessionBySocketId(socketId);
  const game = gameStore.findGameBySessionId(session ? session.id : "");
  const round = game?.round
  const player = game?.getPlayer(session ? session.id : "");

  if (!(session && game && round && player)) {
    console.error(`Session: ${session}\nGame: ${game}\nRound: ${round}\nPlayer: ${player}`);
    throw new Error ("Issue with Backend Data Validity");
  }

  const backendData: SessionGameRoundPlayer = { session: session, game: game, round: round, player: player }

  return backendData;
}

const sessionGamePlayer = (socketId: string): SessionGamePlayer => {
  const session = sessionStore.findSessionBySocketId(socketId);
  const game = gameStore.findGameBySessionId(session ? session.id : "");
  const player = game?.getPlayer(session ? session.id : "");

  if (!(session && game && player)) {
    console.error(`Session: ${session}\nGame: ${game}\nPlayer: ${player}`);
    throw new Error ("Issue with Backend Data Validity");
  }

  const backendData: SessionGamePlayer = { session: session, game: game, player: player }

  return backendData;
}

const getValidatedData = {
  session: session,
  game: game,
  round: round,
  sessionGame: sessionGame,
  gameRound: gameRound,
  sessionGameRound: sessionGameRound,
  sessionGamePlayer: sessionGamePlayer,
  sessionGameRoundPlayer: sessionGameRoundPlayer,
}

export default getValidatedData;