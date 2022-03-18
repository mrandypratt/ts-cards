import { PromptCard } from "../classes/PromptCard";

export type CardDataType = {
  id: number;
  text: string;
  type: string;
};

export type PlayerDataType = {
  name: string;
  cards: CardDataType[];
  socketId: string;
  view: string;
}

export type RoundDataType = {
  playersSocketIds: string[];
  judgeSocketId: string;
  promptCard: CardDataType;
  selectedCardStore: {
    [playerSocketId: string]: CardDataType | null
  };
  winningCard: CardDataType | null;
  winnerSocketId: string | null;
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
  playersSocketIds: string[];
  judgeSocketId: string;
  promptCard: PromptCard;
}

