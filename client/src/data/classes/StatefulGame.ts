import { arePlayerNamesValid } from "../functions/arePlayerNamesValid";
import { ViewsType, ViewType } from "../types/ViewType";

import { Game } from "./Game"

export class StatefulGame extends Game {
  names: string[];
  VIEWS: ViewsType;
  view: ViewType;

  constructor() {
    super();
    this.names = ["", "", ""];
    this.VIEWS = {
      enterPlayers: "enter-players",
      selectPlayer: "player-select",
      judge: "judge-view",
      declareWinner: "declare-winner",
      currentPlayer: null,
    }
    this.view = this.VIEWS.enterPlayers;
  }
  
  clone() {
    return Object.assign(new StatefulGame(), this)
    // return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  setView(view: ViewType): void {
    this.view = view;
  }

  initializeGame(): void {
    super.initializeGame(this.names);
  }
  
  arePlayerNamesValid(): boolean {
    return arePlayerNamesValid(this.names);
  }
}