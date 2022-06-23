import { PlayerDataType } from "../types/ClassTypes";
import { VIEWS } from "../types/VIEWS";
import { ResponseCard } from "./ResponseCard";

export class Player {
  name: string;
  cards: ResponseCard[];
  sessionId: string;
  view: string;

  constructor(sessionId: string, playerData?: PlayerDataType) {
    if (playerData) {
      this.name = playerData.name;
      this.cards = [];
      playerData.cards.forEach(card => {
        this.cards.push(new ResponseCard("" ,card));
      })
      this.sessionId = playerData.sessionId;
      this.view = playerData.view;
    } else {
      this.name = "";
      this.cards = [];
      this.sessionId = sessionId;
      this.view = VIEWS.home;
    }
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
