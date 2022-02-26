import { Socket } from "socket.io-client";
import { StatefulGame } from "../classes/StatefulGame";

export type ViewPropsType = {
  game: StatefulGame;
  setGame: (game: StatefulGame) => void;
  socket?: Socket;
}