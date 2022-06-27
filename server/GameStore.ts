import { Game } from "../client/src/data/classes/Game";
import { Player } from "../client/src/data/classes/Player";
import { GameDataType } from "../client/src/data/types/ClassTypes";

class GameStore {
  games: Game[];

  constructor() {
    this.games = [];
  }

  addGame(game: Game): void {
    this.games.push(game);
  }


  setLobbyId(lobbyId: string, sessionId: string): void {
    this.findGameBySessionId(sessionId)?.setLobby(lobbyId);
  }

  updatePlayer(gameData: GameDataType, sessionId: string): void {
    let newGame = new Game(gameData);

    this.games.find((game, gameIndex): void => {
      if (game.getPlayer(sessionId)) {
        game.players.find((player, playerIndex) => {
          if (player.sessionId === sessionId) {
            let newPlayer = newGame.getPlayer(sessionId);
            if (newPlayer) {
              this.games[gameIndex].players[playerIndex] = newPlayer;
            }
            return;
          }
        })
      }
    });
  }

  updateGame(gameData: GameDataType | Game): void {
    let newGame = new Game(gameData);

    this.games.find((game, gameIndex): void => {
      if (game.id === newGame.id) {
        if (game instanceof Game) {
          this.games[gameIndex] = newGame;
        } else {
          this.games[gameIndex] = new Game(newGame);
        }
        
        return;
      }
    })
  }

  deleteGame(gameId: string): void {
    this.games.find((game, gameIndex): void => {
      if (game.id === gameId) {
        this.games.splice(gameIndex, 1);
        return;
      }
    });
  }

  findGame(gameId: string): Game | null {
    let game = this.games.find(game => game.id === gameId);
    if (game) return game;
    return null
  }

  findGameByLobbyId(lobbyId: string | null): Game | null {
    let game;
    if (lobbyId) {
      game = this.games.find(game => game.lobbyId === lobbyId);
    }
    if (game) return game;
    return null
  }

  findGameBySessionId(socketId: string): Game | null {
    let game = this.games.find(game => game.getPlayer(socketId));
    if (game) return game;
    return null;
  }

  findPlayerBySessionId(sessionId: string): Player | null {
    let game = this.games.find(game => game.getPlayer(sessionId));
    let player = game?.getPlayer(sessionId);
    if (player) return player;
    return null;
  }

}

export const gameStore = new GameStore();