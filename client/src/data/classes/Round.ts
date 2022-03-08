import { NewRoundPropsType, RoundDataType } from "../types/ClassTypes";
import { Player } from "./Player";
import { PromptCard } from "./PromptCard";
import { ResponseCard } from "./ResponseCard";

const isExistingRound = (roundData: NewRoundPropsType | RoundDataType): roundData is RoundDataType => {
  return (roundData as RoundDataType).selectedCardStore !== undefined
}

export class Round {
  players: Player[];
  judge: Player | undefined;
  promptCard: PromptCard;
  selectedCardStore: {
    [playerSocketId: string]: ResponseCard | null
  };
  winningCard: ResponseCard | null;
  winner: Player | null;

  constructor(roundData: NewRoundPropsType | RoundDataType) {
    if (isExistingRound(roundData)) {
      this.players = [];
      roundData.players.forEach(player => {
        this.players.push(new Player("", player))
      });
      this.judge = new Player("", roundData.judge);
      this.promptCard = new PromptCard("", roundData.promptCard);
      this.selectedCardStore = roundData.selectedCardStore;
      this.winningCard = roundData.winningCard === null ? null : new ResponseCard("", roundData.winningCard);
      this.winner = roundData.winner === null ? null : new Player("", roundData.winner);
    } else {
      this.players = roundData.players;
      this.judge = roundData.judge;
      this.promptCard = roundData.promptCard;
      this.selectedCardStore = {};
      this.players.forEach(player => {
        if (player.socketId) {
          this.selectedCardStore[player.socketId] = null;
        }
      });
      this.winningCard = null;
      this.winner = null;
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
    return this.selectedCardStore[socketId] === card;
  }

  allSelectionsMade(): boolean {
    return this.players.every(player => this.selectedCardStore[player.socketId] !== null);
  }

  removePlayedCards(): void {
    this.players.forEach(player => {
      const card = this.getSelection(player.socketId);
      if (card !== null) {
        player.cards.splice(player.cards.indexOf(card), 1);
      }
    })
  }

  setWinningCard(card: ResponseCard): void {
    this.winningCard = card;
  }

  setWinner(player: Player): void {
    this.winner = player;
  }

  isWinningCard(card: ResponseCard): boolean {
    return this.winningCard === card;
  }

  isWinningCardSelected(): boolean {
    return this.winningCard !== null;
  }
}