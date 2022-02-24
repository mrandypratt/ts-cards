import { arePlayerNamesValid } from "../functions/arePlayerNamesValid";
import { ViewsType, VIEWS, ViewType } from "../types/VIEWS";

import { Game } from "./Game"

export class StatefulGame extends Game {
  names: string[];
  view: ViewType;
  VIEWS: ViewsType;

  constructor() {
    super();
    this.names = [];
    this.view = "home";
    this.VIEWS = VIEWS;
  }
  
  clone() {
    return Object.assign(new StatefulGame(), this)
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