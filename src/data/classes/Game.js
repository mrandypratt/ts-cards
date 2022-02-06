import { promptCards } from "../cards/promptCards";
import { responseCards } from "../cards/responseCards";
import { Player } from "./Player";
import { Round } from "./Round";

const CARDS_PER_PLAYER = 3;

export class Game {
  constructor() {
    this.round = null;
    this.rounds = [];
    this.players = [];
    this.promptCards = [...promptCards];
    this.responseCards = [...responseCards];
    this.winningCard = null;
  }
  
  initializeGame() {
    this.createPlayers();
    this.createNewRound();
  }
  
  createPlayers() {
    this.names.forEach(name => {
      this.players.push(new Player(name));
    });
  }
  
  dealCardsToPlayers() {
    this.players.forEach((player) => {
      while (player.cards.length < CARDS_PER_PLAYER) {
        player.drawCard(this.responseCards.pop());
      }
    });
  }
  
  createNewRound() {
    this.round = new Round(this);
    this.dealCardsToPlayers();
    this.rounds.push(this.round);
  }
 
  getPlayerById(id) {
    return this.players.find(player => player.id === id);
  }

  getJudgePlayer() {
    return this.players[this.rounds.length];
  }

  getNonJudgePlayers() {
    return this.players.filter(player => player !== this.players[this.rounds.length])
  }
}