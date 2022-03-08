import { shuffle } from "../functions/shuffle";
import { CardDataType } from "../types/ClassTypes";
import { Card } from "./Card"

export class PromptCard extends Card {
  constructor(text: string, cardData?: CardDataType) {
    super(text, "prompt", cardData)
    PromptCard.allPromptCards.push(this);
  }

  static allPromptCards: PromptCard[] = [];

  static shufflePromptCards(): PromptCard[] {
    return [...shuffle(PromptCard.allPromptCards)];
  }
}