import ShortUniqueId from "short-unique-id";
import { CardDataType, PlayerDataType } from "../../../client/src/data/types/ClassTypes";
import { ResponseCard } from "./ResponseCard";
import ShortUniqueID from "short-unique-id";

const bodIdGenerator = new ShortUniqueID({length: 4});
export class Player {
  sessionId: string;
  name: string;
  cards: ResponseCard[];
  selectedCard: ResponseCard | null;
  wins: number;
  readyForNextRound: boolean;
  botId: string | null;

  constructor(playerData: PlayerDataType | null, sessionId?: string, name?: string, bot?: boolean) {
    // May remove Player Data Reinstantiation after more Understanding of DataBase Calls
    if (playerData) {
      this.sessionId = playerData.sessionId;
      this.name = playerData.name;
      this.cards = playerData.cards;
      this.selectedCard = playerData.selectedCard
      this.wins = playerData.wins; 
      this.readyForNextRound = playerData.readyForNextRound;
      this.botId = playerData.botId;
    } else {
      this.sessionId = sessionId || "";
      this.name = name || "";
      this.cards = [];
      this.selectedCard = null;
      this.wins = 0; 
      this.readyForNextRound = false;
      if (bot) {
        this.botId = bodIdGenerator();
      } else {
        this.botId = null;
      }
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

  playRandomCard(): void {
    const randomCardIndex = Math.floor(Math.random() * this.cards.length);

    // Add to Selected Card
    this.selectedCard = this.cards.splice(randomCardIndex, 1)[0];
  }

  hasSelected(): boolean {
    return this.selectedCard !== null;
  }

  isBot(): boolean {
    return !!this.botId;
  }

  markAsReady(): void {
    this.readyForNextRound = true;
  }
}