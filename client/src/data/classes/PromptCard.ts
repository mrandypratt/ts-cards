import { shuffle } from "../functions/shuffle";
import { Card } from "./Card"

export class PromptCard extends Card {
  constructor(text: string) {
    super(text, "prompt")
    PromptCard.allPromptCards.push(this);
  }

  static allPromptCards: PromptCard[] = [];

  static shufflePromptCards(): PromptCard[] {
    return [...shuffle(PromptCard.allPromptCards)];
  }
}