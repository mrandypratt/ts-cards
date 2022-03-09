import { promptCards } from "../cards/promptCards";
import { responseCards } from "../cards/responseCards";
import { Player } from "./Player";
import { PromptCard } from "./PromptCard";
import { ResponseCard } from "./ResponseCard";
import { Round } from "./Round";
import ShortUniqueID from "short-unique-id";
import { shuffle } from "../functions/shuffle";
import { VIEWS } from "../types/VIEWS";
import { GameDataType, NewRoundPropsType } from "../types/ClassTypes";

const CARDS_PER_PLAYER = 3;
const lobbyIdGenerator = new ShortUniqueID({length: 8});

export class Game {
  round: Round | null;
  rounds: Round[];
  players: Player[];
  promptCards: PromptCard[];
  responseCards: ResponseCard[];
  lobbyId: string;
  
  constructor(gameData?: GameDataType) {
    if (gameData) {
      this.round = gameData.round ? new Round(gameData.round) : null;
      this.rounds = [];
      gameData.rounds.forEach(round => this.rounds.push(new Round(round)))
      this.players = [];
      gameData.players.forEach(player => this.players.push(new Player("", player)))
      this.promptCards = [];
      gameData.promptCards.forEach(promptCard => {
        this.promptCards.push(new PromptCard("", promptCard));
      });
      this.responseCards = [];
      gameData.responseCards.forEach(responseCard => {
        this.responseCards.push(new PromptCard("", responseCard));
      });
      this.lobbyId = gameData.lobbyId;
    } else {
      this.round = null;
      this.rounds = [];
      this.players = [];
      this.promptCards = [...promptCards];
      this.responseCards = [...responseCards];
      this.lobbyId = "";
    }
  }
  
  clone() {
    return Object.assign(new Game(), this)
  }

  currentPlayerView(socketId: string): string | undefined {
    return this.getPlayer(socketId)?.view;
  }
  
  setView(socketId: string | undefined, view: string): void {
    let player = this.players.find(player => player.socketId === socketId)
    player?.setView(view);
  }

  generateLobbyId() {
    this.lobbyId = lobbyIdGenerator();
  }
  
  addPlayer (player: Player) {
    return this.players.push(player);
  }

  getPlayer(socketId: string | undefined): Player | undefined {
    return this.players.find(player => player.socketId === socketId);
  }
  
  setPlayerName(socketId: string, name: string): void {
    let player = this.getPlayer(socketId);
    if (player) {
      player.name = name;
    };
  }

  setLobby(room: string): void {
    this.lobbyId = room;
  }

  initializeRound(): void {
    this.dealCardsToPlayers();
    if (this.rounds.length === 0) {
      this.randomizePlayerOrder();
    }
    this.createNewRound();
    this.updateViewsForNewRound();
  }

  dealCardsToPlayers(): void {
    this.players.forEach((player) => {
      while (player.cards.length < CARDS_PER_PLAYER) {
        player.drawCard(this.responseCards.pop() || new ResponseCard("Error: out of Responses"));
      }
    });
  }

  randomizePlayerOrder(): void {
    this.players = shuffle(this.players)
  }
  
  createNewRound(): void {
    const props: NewRoundPropsType = {
      playersSocketIds: this.players.filter((_, index) => index !== this.rounds.length).map(player => player.socketId),
      judgeSocketId: this.players[this.rounds.length].socketId,
      promptCard: this.promptCards.pop() || new PromptCard('Oops! Out of Cards.')
    };
    
    this.round = new Round(props);
    this.rounds.push(this.round);
  }
  
  getNonJudgePlayers(): Player[] {
    let nonJudgePlayers: Player[] = [];
    let round = this.round;
    
    if (round) {
      round.playersSocketIds.forEach((id): void => {
        let currentPlayer = this.getPlayer(id);
        if (currentPlayer)
        nonJudgePlayers.push(currentPlayer);
      })
    }
    
    return nonJudgePlayers;
  }

  getJudgePlayer(): Player | undefined {
    return this.getPlayer(this.round?.judgeSocketId)
  }
  
  updateViewsForNewRound(): void {
    this.getNonJudgePlayers().forEach(player => {
      player.setView(VIEWS.player.turn);
    })
    
    this.getJudgePlayer()?.setView(VIEWS.judge.waitingforSelections)
  }
  
  updateViewsForJudgeRound(): void {
    this.getNonJudgePlayers().forEach(player => {
      player.setView(VIEWS.player.watchingJudge)
    })
  
    this.getJudgePlayer()?.setView(VIEWS.judge.turn)
  }
}