import { VIEWS } from "../types/VIEWS";
import { ResponseCard } from "./ResponseCard";

let playerIdCounter = 0;

export class Player {
  id: number;
  name: string | undefined;
  cards: ResponseCard[];
  socketId: string | undefined;
  room: string | null;
  view: string;

  constructor(socketId: string | undefined, name?: string) {
    this.id = playerIdCounter;
    playerIdCounter += 1;
    this.name = name;
    this.cards = [];
    this.socketId = socketId;
    this.room = null;
    this.view = VIEWS.home;
  }
  
  drawCard(card: ResponseCard) : number {
    return this.cards.push(card);
  }

  getCardById(id: number): ResponseCard | undefined {
    return this.cards.find(card => card.id === id);
  }

  setName(name: string) {
    this.name = name;
  }

  setView(view: string): void {
    this.view = view;
  }
}
