export type SessionDataType = {
  sessionId: string;
  socketId: string;
  lobbyId: string | null;
  view: string;
}

export type GameDataType = {
  id: string;
  NSFW: boolean;
  round: RoundDataType | null;
  previousRounds: RoundDataType[];
  players: PlayerDataType[];
  judgeIndex: number;
  promptCards: CardDataType[];
  responseCards: CardDataType[];
  cardsPerPlayer: number;
  pointsToWin: number;
  winner: PlayerDataType;
};

export type RoundDataType = {
  number: number;
  players: PlayerDataType[];
  judge: PlayerDataType | null;
  promptCard: CardDataType;
  winner: PlayerDataType | null;
}

export type PlayerDataType = {
  sessionId: string;
  name: string;
  cards: CardDataType[];
  selectedCard: CardDataType | null;
  wins: number;
  readyForNextRound: Boolean;
}

export type CardDataType = {
  id: number;
  text: string;
  type: string;
  NSFW: boolean;
};

