import { Socket } from "socket.io-client";
import { Game } from "../classes/Game";

export type ViewPropsType = {
  game: Game;
  setGame: (game: Game) => void;
  socket?: Socket;
}