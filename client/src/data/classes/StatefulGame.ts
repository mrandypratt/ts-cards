import { arePlayerNamesValid } from "../functions/arePlayerNamesValid";
import { ViewsType, VIEWS, ViewType } from "../types/VIEWS";
import ShortUniqueID from "short-unique-id";
import { Game } from "./Game"

export class StatefulGame extends Game {
  names: string[];
  view: ViewType;
  VIEWS: ViewsType;
  lobbyIdGenerator: ShortUniqueID;
  lobbyId: string | string[];

  constructor() {
    super();
    this.names = [];
    this.view = "home";
    this.VIEWS = VIEWS;
    this.lobbyIdGenerator = new ShortUniqueID({length: 8});
    this.lobbyId = this.lobbyIdGenerator();
  }
  
  clone() {
    return Object.assign(new StatefulGame(), this)
  }

  setView(view: ViewType): void {
    this.view = view;
  }

  generateLobbyId() {
    this.lobbyId = this.lobbyIdGenerator();
  }

  initializeGame(): void {
    super.initializeGame(this.names);
  }
  
  arePlayerNamesValid(): boolean {
    return arePlayerNamesValid(this.names);
  }
}