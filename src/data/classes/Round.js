export class Round {
  constructor(game) {
    this.players = game.getNonJudgePlayers();
    this.judge = game.getJudgePlayer();
    this.promptCard = game.promptCards.pop();
    this.selectedCards = {};
    this.winningCard = null;
    this.winner = null;
  }

  selectCard(player, card) {
    this.selectedCards[player.name] = card;
  }

  hasPlayerSelected(player) {
    return !!this.selectedCards[player.name];
  }

  getSelection(player) {
    return this.selectedCards[player.name];
  }

  isCardSelected(player, card) {
    return this.selectedCards[player.name] === card;
  }

  allSelectionsMade() {
    return this.players.length === Object.keys(this.selectedCards).length;
  }

  removePlayedCards() {
    this.players.forEach(player => {
      player.cards.splice(player.cards.indexOf(this.getSelection(player)), 1);
    })
  }

  isWinner() {
    return this.winner !== null;
  }
}