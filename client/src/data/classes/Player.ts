import { ResponseCard } from "./ResponseCard";

let playerIdCounter = 0;

export class Player {
  id: number;
  name: string;
  cards: ResponseCard[];
  socketId: string | null;
  room: string | null;

  constructor(name: string, socketId?: string) {
    this.id = playerIdCounter;
    playerIdCounter += 1;
    this.name = name;
    this.cards = [];
    this.socketId = socketId || null;
    this.room = null;
  }
  
  drawCard(card: ResponseCard) : number {
    return this.cards.push(card);
  }

  getCardById(id: number): ResponseCard | undefined {
    return this.cards.find(card => card.id === id);
  }
}
