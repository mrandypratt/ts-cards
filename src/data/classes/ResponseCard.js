import { shuffle } from "../functions/shuffle";
import { Card } from "./Card"

export class ResponseCard extends Card {
  constructor(text) {
    super(text)
    this.type = "response";
    ResponseCard.allResponseCards.push(this);
  }

  static allResponseCards = [];

  static shuffleResponseCards() {
    return [...shuffle(ResponseCard.allResponseCards)];
  }
}