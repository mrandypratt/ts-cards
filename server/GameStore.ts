import { Game } from "../client/src/data/classes/Game";
import { Player } from "../client/src/data/classes/Player";

class GameStore {
  games: Game[];

  constructor() {
    this.games = [];
  }

  addGame(game: Game): void {
    this.games.push(game);
  }

  findGameByLobbyId(lobbyId: string): Game | null {
    let game = this.games.find(game => game.lobbyId === lobbyId);
    if (game) return game;
    return null;
  }

  overwriteGame(newGame: Game): void {
    let game = this.games.forEach((game, index) => {
      if (game.lobbyId === newGame.lobbyId) {
        this.games[index] = newGame;
      }
    })
  }

  findGameBySocketId(socketId: string): Game | null {
    let game = this.games.find(game => game.getPlayer(socketId));
    if (game) return game;
    return null;
  }

  findPlayerBySocketId(socketId: string): Player | null {
    let game = this.games.find(game => game.getPlayer(socketId));
    let player = game?.getPlayer(socketId);
    if (player) return player;
    return null;
  }

  updateSocketId(oldSocketId: string, newSocketId: string): Game | null {
    let game = this.findGameBySocketId(oldSocketId);
    let player = game?.getPlayer(oldSocketId);

    if (player && game) {
      player.socketId = newSocketId;
      return game
    }
    return null;
  }

}

export const gameStore = new GameStore();