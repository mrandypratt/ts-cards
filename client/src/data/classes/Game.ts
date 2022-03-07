import { promptCards } from "../cards/promptCards";
import { responseCards } from "../cards/responseCards";
import { RoundProps } from "../types/RoundProps";
import { Player } from "./Player";
import { PromptCard } from "./PromptCard";
import { ResponseCard } from "./ResponseCard";
import { Round } from "./Round";
import ShortUniqueID from "short-unique-id";

const CARDS_PER_PLAYER = 3;

export class Game {
  round: Round | null;
  rounds: Round[];
  players: Player[];
  promptCards: PromptCard[];
  responseCards: ResponseCard[];
  lobbyIdGenerator: ShortUniqueID;
  lobbyId: string | string[];

  constructor() {
    this.round = null;
    this.rounds = [];
    this.players = [];
    this.promptCards = [...promptCards];
    this.responseCards = [...responseCards];
    this.lobbyIdGenerator = new ShortUniqueID({length: 8});
    this.lobbyId = "";
  }

  clone() {
    return Object.assign(new Game(), this)
  }

  generateLobbyId() {
    this.lobbyId = this.lobbyIdGenerator();
  }
  
  initializeGame(names: string[]): void {
    this.dealCardsToPlayers();
    this.createNewRound();
  }

  addPlayer(socketId: string | undefined) {
    return this.players.push(new Player(socketId));
  }

  setName(socketId: string | undefined, name: string): void {
    let player = this.getPlayer(socketId);
    if (player) {
      player.name = name;
    };
  }
  
  dealCardsToPlayers() {
    this.players.forEach((player) => {
      while (player.cards.length < CARDS_PER_PLAYER) {
        player.drawCard(this.responseCards.pop() || new ResponseCard("Error: out of Responses"));
      }
    });
  }
  
  createNewRound() {
    const props: RoundProps = {
      players: this.getNonJudgePlayers(),
      judge: this.getJudgePlayer(),
      promptCard: this.promptCards.pop() || new PromptCard('Oops! Out of Cards.')
    };
    
    this.round = new Round(props);
    this.rounds.push(this.round);
  }

  getPlayer(socketId: string | undefined): Player | undefined {
    return this.players.find(player => player.socketId === socketId);
  }

  currentPlayerView(socketId: string | undefined): string | undefined {
    return this.getPlayer(socketId)?.view;
  }

  setView(socketId: string | undefined, view: string): void {
    let player = this.players.find(player => player.socketId === socketId)
    player?.setView(view);
  }

  getJudgePlayer(): Player {
    return this.players[this.rounds.length];
  }

  getNonJudgePlayers(): Player[] {
    return this.players.filter(player => player !== this.players[this.rounds.length])
  }
}