import { shuffle } from "../functions/shuffle";
import { Card } from "./Card"

export class ResponseCard extends Card {
  constructor(text: string) {
    super(text, "response")
    ResponseCard.allResponseCards.push(this);
  }

  static allResponseCards: ResponseCard[] = [];

  static shuffleResponseCards(): ResponseCard[] {
    return [...shuffle(ResponseCard.allResponseCards)];
  }
}