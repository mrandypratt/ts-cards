let playerIdCounter = 0;

export class Player {
  constructor(name) {
    this.id = playerIdCounter;
    playerIdCounter += 1;
    this.name = name;
    this.cards = [];
  }
  
  drawCard(card) {
    this.cards.push(card);
  }

  getCardById(id) {
    return this.cards.find(card => card.id === id);
  }
}
