import { Player } from "../classes/Player";
import { PromptCard } from "../classes/PromptCard";

export type CardDataType = {
  id: number;
  text: string;
  type: string;
};

export type PlayerDataType = {
  id: number;
  name: string;
  cards: CardDataType[];
  socketId: string;
  view: string;
}

export type RoundDataType = {
  players: PlayerDataType[];
  judge: PlayerDataType;
  promptCard: CardDataType;
  selectedCardStore: {
    [playerSocketId: string]: CardDataType | null
  };
  winningCard: CardDataType | null;
  winner: PlayerDataType | null;
}

export type GameDataType = {
  round: RoundDataType | null;
  rounds: RoundDataType[];
  players: PlayerDataType[];
  promptCards: CardDataType[];
  responseCards: CardDataType[];
  lobbyId: string;
}

export type NewRoundPropsType = {
  players: Player[];
  judge: Player;
  promptCard: PromptCard;
}

