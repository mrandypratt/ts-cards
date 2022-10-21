import { Game } from "../data/classes/Game";
import { Player } from "../data/classes/Player";
import { Round } from "../data/classes/Round";
import { Session } from "../data/classes/Session";
import { gameStore } from "../data/GameStore";
import { sessionStore } from "../data/SessionStore";

interface BackendData {
  session: Session | null,
  game: Game | null,
  round: Round | null,
  player: Player | null,
}

export const getBackendData = (socketId: string): BackendData => {
  const session = sessionStore.findSessionBySocketId(socketId);
  const game = gameStore.findGameBySessionId(session ? session.id : "");
  const round = game?.round || null;
  const player = game?.getPlayer(session?.id) || null;

  const backendData: BackendData = { session: session, game: game, round: round, player: player }

  return backendData;
}