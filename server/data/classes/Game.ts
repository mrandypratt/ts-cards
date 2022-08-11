import { cardStore } from "../CardStore"
import { Player } from "./Player";
import { PromptCard } from "./PromptCard";
import { ResponseCard } from "./ResponseCard";
import { Round } from "./Round";
import ShortUniqueID from "short-unique-id";
import { shuffle } from "../../functions/shuffle";
import { GameDataType } from "../../../client/src/data/types/ClassTypes";

const gameIdGenerator = new ShortUniqueID({length: 4, dictionary: "alphanum_upper"});

export class Game {
  id: string;
  NSFW: boolean;
  round: Round | null;
  previousRounds: Round[];
  players: Player[];
  promptCards: PromptCard[];
  responseCards: ResponseCard[];
  judgeIndex: number;
  cardsPerPlayer: number;
  pointsToWin: number;
  winner: Player | null;
  
  constructor(gameData: GameDataType | null, player?: Player, NSFW?: boolean) {
    // May remove Player Data Reinstantiation after more Understanding of DataBase Calls
    if (gameData) {
      this.id = gameData.id
      this.NSFW = gameData.NSFW;
      let round = gameData.round;
      if (round) {
        this.round = new Round(round);
      } else {
        this.round = null;
      }
      this.previousRounds = [];
      gameData.previousRounds.forEach(round => this.previousRounds.push(new Round(round)))
      this.players = [];
      gameData.players.forEach(player => this.players.push(new Player(player)))
      this.judgeIndex = gameData.judgeIndex
      this.promptCards = [];
      gameData.promptCards.forEach(promptCard => {
        this.promptCards.push(new PromptCard(promptCard));
      });
      this.responseCards = [];
      gameData.responseCards.forEach(responseCard => {
        this.responseCards.push(new ResponseCard(responseCard));
      });
      this.cardsPerPlayer = gameData.cardsPerPlayer;
      this.pointsToWin = gameData.pointsToWin;
      this.winner = gameData.winner ? new Player(gameData.winner) : null;
    } else {
      // If creating a new game altogether with only one player and NSFW Selection
      this.id = gameIdGenerator();
      this.NSFW = false;
      if (NSFW) {
        this.NSFW = NSFW;
      }
      this.round = null;
      this.previousRounds = [];
      this.players = [];
      this.judgeIndex = 0;
      if (player) {
        this.players.push(player);
      }
      this.promptCards = [];
      this.responseCards = [];
      this.cardsPerPlayer = 3;
      this.pointsToWin = 3;
      this.winner = null;
    } 
  }
  
  addPlayer (player: Player) {
    return this.players.push(player);
  }

  getPlayer(sessionId: string | undefined): Player | undefined {
    return this.players.find(player => player.sessionId === sessionId);
  }

  randomizePlayerOrder(): void {
    this.players = shuffle(this.players)
  }

  loadDeckIntoGame(): void {
    this.loadPromptCards();
    this.loadResponseCards();
  }

  loadPromptCards(): void {
    if (this.NSFW) {
      this.promptCards = shuffle(cardStore.dealNSFWPromptCards());
    } else {
      this.promptCards = shuffle(cardStore.dealCleanPromptCards());
    }
  }

  loadResponseCards(): void {
    if (this.NSFW) {
      this.responseCards = shuffle(cardStore.dealNSFWResponseCards());
    } else {
      this.responseCards = shuffle(cardStore.dealCleanResponseCards());
    }
  }

  dealCardsToPlayers(): void {
    this.players.forEach((player) => {
      while (player.cards.length < this.cardsPerPlayer) {

        // Detect end of deck and replenish if empty
        if (this.responseCards.length === 0) {
          this.loadResponseCards();
        } 

        // Only put card in hand that isn't currently in play
        let newCard = this.responseCards.pop();

        if (newCard) {
          let cardIsUnique = true;

          this.players.forEach(player => {
            player.cards.forEach(card => {
              if (card.text === newCard?.text) {
                cardIsUnique = false;
              }
            })
          })
  
          if (cardIsUnique) {
            player.drawCard(newCard)
          } else {
            this.responseCards.unshift(newCard);
          }
        } else {
          console.log("Error: Not a Response Card")
        }
      }
    });
  }

  getNonJudgePlayers(): Player[] {
    return this.players.filter((player, index) => {
      return index !== this.judgeIndex;
    })
  }

  getJudgePlayer(): Player | null {
    const judge = this.players.find((player, index) => {
      return index === this.judgeIndex;
    })

    if (judge) return judge;
    return null;
  }
  
  createNewRound(): void {
    if (this.promptCards.length === 0) {
      this.loadPromptCards()
    }

    const props = {
      number: this.previousRounds.length + 1,
      players: this.getNonJudgePlayers(),
      judge: this.getJudgePlayer(),
      promptCard: this.promptCards.pop() || null,
    };
    
    this.round = new Round(null, props)
  }
  
  allPlayersReady(): Boolean {
    return this.players.every(player => player.readyForNextRound === true)
  }

  incrementWins(): void {
    this.players.forEach(player => {
      if (player.sessionId === this.round?.winner?.sessionId) {
        player.wins += 1;

        if (player.wins >= this.pointsToWin) {
          this.winner = player;
        }
      }
    });
  }

  resetPlayersAfterRound(): void {
    this.players.forEach(player => {
      player.selectedCard = null;
      player.readyForNextRound = false;
    })
  }

  incrementJudgeIndex(): void {
    this.judgeIndex += 1;

    if (this.judgeIndex >= this.players.length) {
      this.judgeIndex = 0;
    }
  }

  archiveRound(): void {
    const round = this.round;

    if (round) {
      this.previousRounds.push(round);
    }
  }

  removePlayer(sessionId: string | undefined): void {
    this.players.forEach((player, playerIndex) => {
      if (player.sessionId === sessionId) {
        this.players.splice(playerIndex, 1);
        return;
      };
    })
  }
  
  reset(): void {
    // Keep cards and otherwise clear all prior game data
    this.round = null;
    this.previousRounds = [];

    this.players.forEach(player => {
      player.wins = 0;
      player.readyForNextRound = false;
      player.selectedCard = null;
    })

    this.winner = null;
  }
  
}

/*

  round: Round | null;
  previousRounds: Round[];
  players: Player[];
  promptCards: PromptCard[];
  responseCards: ResponseCard[];
  judgeIndex: number;
  cardsPerPlayer: number;
  pointsToWin: number;
  winner: Player | null;

*/