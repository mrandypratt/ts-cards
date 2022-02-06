import { shuffle } from "../functions/shuffle";
import { Card } from "../classes/Card"

export class PromptCard extends Card {
  constructor(text) {
    super(text)
    this.type = "prompt";
    PromptCard.allPromptCards.push(this);
  }

  static allPromptCards = [];

  static shufflePromptCards() {
    return [...shuffle(PromptCard.allPromptCards)];
  }
}