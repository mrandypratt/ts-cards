import { RoundProps } from "../types/RoundProps";
import { Player } from "./Player";
import { PromptCard } from "./PromptCard";
import { ResponseCard } from "./ResponseCard";
export class Round {
  players: Player[];
  judge: Player;
  promptCard: PromptCard;
  selectedCards: {
    [player: string]: ResponseCard | null
  };
  winningCard: ResponseCard | null;
  winner: Player | null;

  constructor({ players, judge, promptCard }: RoundProps) {
    this.players = players;
    this.judge = judge;
    this.promptCard = promptCard;
    this.selectedCards = {};
    players.forEach(player => {
      this.selectedCards[player.name] = null;
    });
    this.winningCard = null;
    this.winner = null;
  }

  selectCard(name: string, card: ResponseCard): void {
    this.selectedCards[name] = card;
  }

  hasPlayerSelected(name: string) {
    return !!this.selectedCards[name];
  }

  getSelection(name: string): ResponseCard | null {
    return this.selectedCards[name];
  }

  isCardSelected(name: string, card: ResponseCard): boolean {
    return this.selectedCards[name] === card;
  }

  allSelectionsMade(): boolean {
    return this.players.every(player => this.selectedCards[player.name] !== null);
  }

  removePlayedCards(): void {
    this.players.forEach(player => {
      const card = this.getSelection(player.name);
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