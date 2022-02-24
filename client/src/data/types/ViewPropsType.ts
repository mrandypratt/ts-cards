import { StatefulGame } from "../classes/StatefulGame";

export type ViewPropsType = {
  game: StatefulGame;
  setGame: (game: StatefulGame) => void;
}