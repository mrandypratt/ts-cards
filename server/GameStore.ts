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


  setLobbyId(lobbyId: string, socketId: string): void {
    this.findGameBySocketId(socketId)?.setLobby(lobbyId);
  }

  updatePlayer(gameData: GameDataType, socketId: string): void {
    let newGame = new Game(gameData);

    this.games.find((game, gameIndex): void => {
      if (game.getPlayer(socketId)) {
        game.players.find((player, playerIndex) => {
          if (player.socketId === socketId) {
            let newPlayer = newGame.getPlayer(socketId);
            if (newPlayer) {
              this.games[gameIndex].players[playerIndex] = newPlayer;
            }
            return;
          }
        })
      }
    });
  }

  findGameByLobbyId(lobbyId: string): Game | null {
    let game = this.games.find(game => game.lobbyId === lobbyId);
    if (game) return game;
    return null;
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