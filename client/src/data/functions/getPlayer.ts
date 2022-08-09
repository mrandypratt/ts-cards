import { GameDataType, PlayerDataType } from "../types/ClassTypes";

export const getCurrentPlayer = (game: GameDataType | null, sessionId: string): PlayerDataType | null => {
  const player =  game?.players.find(player => player.sessionId === sessionId)
  if (player) return player;
  return null;
}