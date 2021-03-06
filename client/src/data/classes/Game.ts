import { cardStore } from "../cards/CardStore"
import { Player } from "./Player";
import { PromptCard } from "./PromptCard";
import { ResponseCard } from "./ResponseCard";
import { Round } from "./Round";
import ShortUniqueID from "short-unique-id";
import { shuffle } from "../functions/shuffle";
import { VIEWS } from "../types/VIEWS";
import { GameDataType, NewRoundPropsType } from "../types/ClassTypes";

const CARDS_PER_PLAYER = 3;
const WINNING_SCORE = 3;
const lobbyIdGenerator = new ShortUniqueID({length: 4});
const gameIdGenerator = new ShortUniqueID({length: 8});

export class Game {
  id: string;
  NSFW: boolean;
  round: Round | null;
  rounds: Round[];
  players: Player[];
  promptCards: PromptCard[];
  responseCards: ResponseCard[];
  lobbyId: string | null;
  
  constructor(gameData?: GameDataType) {
    if (gameData) {
      this.id = gameData.id
      this.NSFW = gameData.NSFW
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
        this.responseCards.push(new ResponseCard("", responseCard));
      });
      this.lobbyId = gameData.lobbyId;
    } else {
      this.id = gameIdGenerator();
      this.NSFW = false;
      this.round = null;
      this.rounds = [];
      this.players = [];
      this.promptCards = [];
      this.responseCards = [];
      this.lobbyId = null;
    }
  }
  
  clone() {
    return Object.assign(new Game(), this)
  }

  getPlayerView(sessionId: string): string | null {
    let currentView = this.getPlayer(sessionId)?.view
    if (currentView) return currentView;
    return null;
  }
  
  setView(sessionId: string | undefined, view: string): void {
    let player = this.players.find(player => player.sessionId === sessionId)
    player?.setView(view);
  }

  generateLobbyId() {
    this.lobbyId = lobbyIdGenerator();
  }
  
  addPlayer (player: Player) {
    return this.players.push(player);
  }

  getPlayer(sessionId: string | undefined): Player | undefined {
    return this.players.find(player => player.sessionId === sessionId);
  }

  removePlayer(sessionId: string | undefined): void {
    this.players.forEach((player, playerIndex) => {
      if (player.sessionId === sessionId) {
        this.players.splice(playerIndex, 1);
        return;
      };
    })
  }
  
  setPlayerName(sessionId: string, name: string): void {
    let player = this.getPlayer(sessionId);
    if (player) {
      player.name = name;
    };
  }

  toggleNSFW(): void {
    this.NSFW = !this.NSFW
  }

  setLobby(room: string): void {
    this.lobbyId = room;
  }

  initializeRound(): void {
    this.loadDeckIntoGame();
    this.dealCardsToPlayers();
    if (this.rounds.length === 0) {
      this.randomizePlayerOrder();
    }
    this.createNewRound();
    this.updateViewsForNewRound();
  }

  loadDeckIntoGame(): void {
    if (this.NSFW) {
      this.promptCards = shuffle(cardStore.dealNSFWPromptCards());
      this.responseCards = shuffle(cardStore.dealNSFWResponseCards());
    } else {
      this.promptCards = shuffle(cardStore.dealCleanPromptCards());
      this.responseCards = shuffle(cardStore.dealCleanResponseCards());
    }
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
      playersSessionIds: this.players.filter((_, index) => index !== (this.rounds.length % this.players.length)).map(player => player.sessionId),
      judgeSessionId: this.players[this.rounds.length % this.players.length].sessionId,
      promptCard: this.promptCards.pop() || new PromptCard('Oops! Out of Cards.')
    };
    
    this.round = new Round(props);
  }
  
  getNonJudgePlayers(): Player[] {
    let nonJudgePlayers: Player[] = [];
    let round = this.round;
    
    if (round) {
      round.playersSessionIds.forEach((sessionId: string): void => {
        let currentPlayer = this.getPlayer(sessionId);
        if (currentPlayer)
        nonJudgePlayers.push(currentPlayer);
      })
    }
    
    return nonJudgePlayers;
  }

  getJudgePlayer(): Player | undefined {
    return this.getPlayer(this.round?.judgeSessionId)
  }
  
  updateViewsForNewRound(): void {
    this.getNonJudgePlayers().forEach(player => {
      player.setView(VIEWS.player.turn);
    })
    
    this.getJudgePlayer()?.setView(VIEWS.judge.waitingforSelections)
  }
  
  updateViewsForJudgeRound(): void {
    this.getNonJudgePlayers().forEach(player => {
      player.setView(VIEWS.player.waitingForJudge)
    })
  
    this.getJudgePlayer()?.setView(VIEWS.judge.turn)
  }

  updateViewsForRoundResults(): void {
    this.players.forEach(player => player.setView(VIEWS.results.round));
  }
  
  updateViewsForGameResults(): void {
    this.players.forEach(player => player.setView(VIEWS.results.game));
  }

  getRoundWinner(): Player | undefined {
    let winnerSessionId = this.round?.winnerSessionId;
    return winnerSessionId ? this.getPlayer(winnerSessionId) : undefined;
  }

  getScore(sessionId: string): number {
    return this.rounds.filter(round => round.winnerSessionId === sessionId).length;
  }

  readyForNextRound(): boolean {
    return this.players.every(player => player.view === VIEWS.results.waitingForNextRound)
  }

  readyForNextGame(): boolean {
    return this.players.every(player => player.view === VIEWS.results.waitingForNextGame)
  }

  addRoundToRounds(): void {
    if (this.round) {
      this.rounds.push(this.round);
    }
  }

  createNextRound(): void {
    this.discardPlayedCards();
    this.initializeRound();
  }

  discardPlayedCards(): void {
    let selectedCardStore = this.round?.selectedCardStore
    
    for (const playerSessionId in selectedCardStore) {
      let player = this.getPlayer(playerSessionId);
      let cardId = selectedCardStore[playerSessionId]?.id;
      let cardToRemove = player?.cards.find(card => card.id === cardId);
      
      if (player && cardToRemove) {
        player.cards.splice(player.cards.indexOf(cardToRemove), 1)
      }
    }
  }

  isGameWinner(): boolean {
    return this.players.some(player => {
      return this.getScore(player.sessionId) >= WINNING_SCORE;
    })
  }

  resetGame(): void {
    this.rounds.splice(0);
    this.initializeRound();
  }
}