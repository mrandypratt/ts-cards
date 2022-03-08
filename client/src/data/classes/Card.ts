import { CardDataType } from "../types/ClassTypes";

let cardIdCounter = 0;

export class Card {
  id: number;
  text: string;
  type: string;

  constructor(text: string="", type: string="", cardData?: CardDataType) {
    if (cardData) {
      this.id = cardData.id;
      this.text = cardData.text;
      this.type = cardData.type;
    } else {
      this.id = cardIdCounter;
      cardIdCounter += 1;
      this.text = text;
      this.type = type;
    }
  }
}
