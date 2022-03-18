import { shuffle } from "../functions/shuffle";
import { CardDataType } from "../types/ClassTypes";
import { Card } from "./Card"
export class ResponseCard extends Card {
  constructor(text: string, cardData?: CardDataType) {
    super(text, "response", cardData);
    ResponseCard.allResponseCards.push(this);
  }

  static allResponseCards: ResponseCard[] = [];

  static shuffleResponseCards(): ResponseCard[] {
    return [...shuffle(ResponseCard.allResponseCards)];
  }
}