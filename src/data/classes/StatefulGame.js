import { Game } from "./Game"

export class StatefulGame extends Game {
  constructor() {
    super();
    this.names = ["", "", ""];
    this.VIEWS = {
      enterPlayers: "enter-players",
      selectPlayer: "player-select",
      judge: "judge-view",
      declareWinner: "declare-winner",
    }
    this.view = this.VIEWS.enterPlayers;
  }
  
  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  setView(view) {
    this.view = view;
  }

  instantiatePlayers() {
    super.instantiatePlayers(this.names);
  }
  
  arePlayerNamesValid () {
    return this.areAllFieldsFilled() && 
      this.areAllNamesUnique() &&
      this.containsValidCharacters();
  }

  areAllFieldsFilled () {
    return this.names.every(name => name !== "");
  }
  
  areAllNamesUnique () {
    return !this.names.some((name, index) => this.names.indexOf(name) !== index)
  }
  
  containsValidCharacters () {
    return this.names.every(name => name.match(/\S/));
  }
}