let cardIdCounter = 0;

type cardType = "prompt" | "response";

export class Card {
  id: number;
  text: string;
  type: cardType;

  constructor(text: string, type: cardType) {
    this.id = cardIdCounter;
    cardIdCounter += 1;
    this.text = text;
    this.type = type;
  }
}
