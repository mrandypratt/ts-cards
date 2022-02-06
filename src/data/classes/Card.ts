let cardIdCounter = 0;

export class Card {
  id: number;
  text: string;

  constructor(text: string) {
    this.id = cardIdCounter;
    cardIdCounter += 1;
    this.text = text;
  }
}
