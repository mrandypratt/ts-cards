import { gameStore } from "../data/GameStore";

export const log = (event: string, sessionId: string, socketId: string, lobbyId?: string, ...messages: string[]): void => {
  console.log(event);
  console.log(`-- SessionID: ${sessionId}`)
  console.log(`-- SocketID: ${socketId}`);
  if (lobbyId && (lobbyId !== "")) {
    console.log(`--LobbyId: ${lobbyId}`)
  }
  messages.forEach(message => console.log(`--${message}`));
  console.log("")
  gameStore.logGames();
  console.log("")
}