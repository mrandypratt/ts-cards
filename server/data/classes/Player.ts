import { CardDataType, PlayerDataType } from "../../../client/src/data/types/ClassTypes";
import { ResponseCard } from "./ResponseCard";

export class Player {
  sessionId: string;
  name: string;
  cards: ResponseCard[];
  selectedCard: ResponseCard | null;
  wins: number;
  readyForNextRound: Boolean;

  constructor(playerData: PlayerDataType | null, sessionId?: string, name?: string) {
    // May remove Player Data Reinstantiation after more Understanding of DataBase Calls
    if (playerData) {
      this.sessionId = playerData.sessionId;
      this.name = playerData.name;
      this.cards = playerData.cards;
      this.selectedCard = playerData.selectedCard
      this.wins = playerData.wins; 
      this.readyForNextRound = playerData.readyForNextRound
    } else {
      this.sessionId = sessionId || "";
      this.name = name || "";
      this.cards = [];
      this.selectedCard = null;
      this.wins = 0; 
      this.readyForNextRound = false;
    }
  }
  
  drawCard(card: ResponseCard) : number {
    return this.cards.push(card);
  }

  playCard(cardToSelect: CardDataType): void {
    // Add to Selected Card
    this.selectedCard = new ResponseCard(cardToSelect)
    // Remove from Hand
    this.cards = this.cards.filter(card => card.id !== cardToSelect.id)
  }

  markAsReady(): void {
    this.readyForNextRound = true;
  }
}