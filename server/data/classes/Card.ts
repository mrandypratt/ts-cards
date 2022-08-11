import { CardDataType } from "../../../client/src/data/types/ClassTypes";

let cardIdCounter = 0;

export class Card {
  id: number;
  text?: string;
  type?: string;
  NSFW?: boolean;

  constructor(cardData: CardDataType | null, text: string="", type: string="", NSFW: boolean) {
    if (cardData) {
      this.id = cardData.id;
      this.text = cardData.text;
      this.type = cardData.type;
      this.NSFW = cardData.NSFW;
    } else {
      this.id = cardIdCounter;
      cardIdCounter += 1;
      this.text = text;
      this.type = type;
      this.NSFW = NSFW;
    }
  }
}
