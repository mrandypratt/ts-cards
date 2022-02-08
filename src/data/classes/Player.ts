import { ResponseCard } from "./ResponseCard";

let playerIdCounter = 0;

export class Player {
  id: number;
  name: string;
  cards: ResponseCard[];

  constructor(name: string) {
    this.id = playerIdCounter;
    playerIdCounter += 1;
    this.name = name;
    this.cards = [];
  }
  
  drawCard(card: ResponseCard): void {
    this.cards.push(card);
  }

  getCardById(id: number): ResponseCard | undefined {
    return this.cards.find(card => card.id === id);
  }
}
