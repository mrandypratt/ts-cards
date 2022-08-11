import { CardDataType } from "../../../client/src/data/types/ClassTypes";
import { shuffle } from "../../functions/shuffle";
import { Card } from "./Card"

export class PromptCard extends Card {
  constructor(cardData: CardDataType | null, text?: string, NSFW?: boolean) {
    super(cardData, text, "prompt", NSFW || false)
    PromptCard.allPromptCards.push(this);
  }

  static allPromptCards: PromptCard[] = [];

  static shufflePromptCards(): PromptCard[] {
    return [...shuffle(PromptCard.allPromptCards)];
  }
}