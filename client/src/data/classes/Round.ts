import { NewRoundPropsType, RoundDataType } from "../types/ClassTypes";
import { PromptCard } from "./PromptCard";
import { ResponseCard } from "./ResponseCard";

const isExistingRound = (roundData: NewRoundPropsType | RoundDataType): roundData is RoundDataType => {
  return (roundData as RoundDataType).selectedCardStore !== undefined
}

export class Round {
  playersSocketIds: string[];
  judgeSocketId: string ;
  promptCard: PromptCard;
  selectedCardStore: {
    [playerSocketId: string]: ResponseCard | null
  };
  winningCard: ResponseCard | null;
  winnerSocketId: string | null;

  constructor(roundData: NewRoundPropsType | RoundDataType) {
    if (isExistingRound(roundData)) {
      this.playersSocketIds = [];
      roundData.playersSocketIds.forEach(socketId => {
        this.playersSocketIds.push(socketId);
      });
      this.judgeSocketId = roundData.judgeSocketId;
      this.promptCard = new PromptCard("", roundData.promptCard);
      this.selectedCardStore = roundData.selectedCardStore;
      this.winningCard = roundData.winningCard === null ? null : new ResponseCard("", roundData.winningCard);
      this.winnerSocketId = roundData.winnerSocketId === null ? null : roundData.winnerSocketId;
    } else {
      this.playersSocketIds = roundData.playersSocketIds;
      this.judgeSocketId = roundData.judgeSocketId;
      this.promptCard = roundData.promptCard;
      this.selectedCardStore = {};
      this.playersSocketIds.forEach(socketId => {
        this.selectedCardStore[socketId] = null;
      });
      this.winningCard = null;
      this.winnerSocketId = null;
    }
  }

  selectCard(socketId: string, card: ResponseCard): void {
    this.selectedCardStore[socketId] = card;
  }

  hasPlayerSelected(socketId: string): boolean {
    return !!this.selectedCardStore[socketId];
  }

  getSelection(socketId: string): ResponseCard | null {
    return this.selectedCardStore[socketId];
  }

  isCardSelected(socketId: string, card: ResponseCard): boolean {
    return this.selectedCardStore[socketId]?.text === card.text;
  }

  allSelectionsMade(): boolean {
    return this.playersSocketIds.every(playerSocketId => this.selectedCardStore[playerSocketId] !== null);
  }

  setWinningCard(card: ResponseCard): void {
    this.winningCard = card;
  }

  setWinner(card: ResponseCard): void {
    this.playersSocketIds.forEach((playerSocketId) => {
      if (this.selectedCardStore[playerSocketId] === card) {
        this.winnerSocketId = playerSocketId;
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