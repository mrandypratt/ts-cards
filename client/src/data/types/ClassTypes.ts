import { PromptCard } from "../classes/PromptCard";

export type CardDataType = {
  id: number;
  text: string;
  type: string;
};

export type PlayerDataType = {
  name: string;
  cards: CardDataType[];
  sessionId: string;
  view: string;
}

export type RoundDataType = {
  playersSessionIds: string[];
  judgeSessionId: string;
  promptCard: CardDataType;
  selectedCardStore: {
    [playerSessionId: string]: CardDataType | null
  };
  winningCard: CardDataType | null;
  winnerSessionId: string | null;
}

export type GameDataType = {
  id: string;
  NSFW: boolean;
  round: RoundDataType | null;
  rounds: RoundDataType[];
  players: PlayerDataType[];
  promptCards: CardDataType[];
  responseCards: CardDataType[];
  lobbyId: string | null;
}

export type NewRoundPropsType = {
  playersSessionIds: string[];
  judgeSessionId: string;
  promptCard: PromptCard;
}

