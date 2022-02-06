import { Card } from "./Card";

let playerIdCounter = 0;

export class Player {
  id: number;
  name: string;
  cards: Card[];

  constructor(name: string) {
    this.id = playerIdCounter;
    playerIdCounter += 1;
    this.name = name;
    this.cards = [];
  }
  
  drawCard(card: Card): void {
    this.cards.push(card);
  }

  getCardById(id: number): Card | undefined {
    return this.cards.find(card => card.id === id);
  }
}
