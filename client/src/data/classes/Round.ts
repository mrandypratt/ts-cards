import { RoundProps } from "../types/RoundProps";
import { Player } from "./Player";
import { PromptCard } from "./PromptCard";
import { ResponseCard } from "./ResponseCard";

export class Round {
  players: Player[];
  judge: Player;
  promptCard: PromptCard;
  selectedCards: {
    [playerSocketId: string]: ResponseCard | null
  };
  winningCard: ResponseCard | null;
  winner: Player | null;

  constructor({ players, judge, promptCard }: RoundProps) {
    this.players = players;
    this.judge = judge;
    this.promptCard = promptCard;
    this.selectedCards = {};
    players.forEach(player => {
      if (player.socketId) {
        this.selectedCards[player.socketId] = null;
      }
    });
    this.winningCard = null;
    this.winner = null;
  }

  selectCard(socketId: string | undefined, card: ResponseCard): void {
    if (socketId) {
      this.selectedCards[socketId] = card;
    }
  }

  hasPlayerSelected(socketId: string | undefined): boolean {
    if (socketId) {
      return !!this.selectedCards[socketId];
    } else {
      return false;
    }
  }

  getSelection(socketId: string | undefined): ResponseCard | null {
    if (socketId) {
      return this.selectedCards[socketId];
    } else {
      return null
    }
  }

  isCardSelected(socketId: string | undefined, card: ResponseCard): boolean {
    if (socketId) {
      return this.selectedCards[socketId] === card;
    } else {
      return false;
    }
  }

  allSelectionsMade(): boolean {
    return this.players.every(player => player.socketId && (this.selectedCards[player.socketId] !== null));
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