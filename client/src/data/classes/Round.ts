import { NewRoundPropsType, RoundDataType } from "../types/ClassTypes";
import { PromptCard } from "./PromptCard";
import { ResponseCard } from "./ResponseCard";

const isExistingRound = (roundData: NewRoundPropsType | RoundDataType): roundData is RoundDataType => {
  return (roundData as RoundDataType).selectedCardStore !== undefined
}

export class Round {
  playersSessionIds: string[];
  judgeSessionId: string ;
  promptCard: PromptCard;
  selectedCardStore: {
    [playerSessionId: string]: ResponseCard | null
  };
  winningCard: ResponseCard | null;
  winnerSessionId: string | null;

  constructor(roundData: NewRoundPropsType | RoundDataType) {
    if (isExistingRound(roundData)) {
      this.playersSessionIds = [];
      roundData.playersSessionIds.forEach(sessionId => {
        this.playersSessionIds.push(sessionId);
      });
      this.judgeSessionId = roundData.judgeSessionId;
      this.promptCard = new PromptCard("", roundData.promptCard);
      this.selectedCardStore = roundData.selectedCardStore;
      this.winningCard = roundData.winningCard === null ? null : new ResponseCard("", roundData.winningCard);
      this.winnerSessionId = roundData.winnerSessionId === null ? null : roundData.winnerSessionId;
    } else {
      this.playersSessionIds = roundData.playersSessionIds;
      this.judgeSessionId = roundData.judgeSessionId;
      this.promptCard = roundData.promptCard;
      this.selectedCardStore = {};
      this.playersSessionIds.forEach(sessionId => {
        this.selectedCardStore[sessionId] = null;
      });
      this.winningCard = null;
      this.winnerSessionId = null;
    }
  }

  selectCard(sessionId: string, card: ResponseCard): void {
    this.selectedCardStore[sessionId] = card;
  }

  hasPlayerSelected(sessionId: string): boolean {
    return !!this.selectedCardStore[sessionId];
  }

  getSelection(sessionId: string): ResponseCard | null {
    return this.selectedCardStore[sessionId];
  }

  isCardSelected(sessionId: string, card: ResponseCard): boolean {
    return this.selectedCardStore[sessionId]?.text === card.text;
  }

  allSelectionsMade(): boolean {
    return this.playersSessionIds.every(playerSessionId => this.selectedCardStore[playerSessionId] !== null);
  }

  setWinningCard(card: ResponseCard): void {
    this.winningCard = card;
  }

  setWinner(card: ResponseCard): void {
    this.playersSessionIds.forEach((playerSessionId) => {
      if (this.selectedCardStore[playerSessionId] === card) {
        this.winnerSessionId = playerSessionId;
      }
    })
  }

  isWinningCard(card: ResponseCard): boolean {
    return this.winningCard === card;
  }

  isWinningCardSelected(): boolean {
    return this.winningCard !== null;
  }
}