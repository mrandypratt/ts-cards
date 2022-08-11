import { CardDataType } from "../../../client/src/data/types/ClassTypes";
import { shuffle } from "../../functions/shuffle";
import { Card } from "./Card"

export class ResponseCard extends Card {
  constructor(cardData: CardDataType | null, text?: string, NSFW?: boolean) {
    super(cardData, text, "response", NSFW || false);
    ResponseCard.allResponseCards.push(this);
  }

  static allResponseCards: ResponseCard[] = [];

  static shuffleResponseCards(): ResponseCard[] {
    return [...shuffle(ResponseCard.allResponseCards)];
  }
}