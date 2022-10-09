import { Socket } from "socket.io-client";
import { GameDataType } from "./ClassTypes";

export type ViewPropsType = {
  game: GameDataType | null;
  setGame: (game: GameDataType) => void;
  socket: Socket;
  sessionId: string
}