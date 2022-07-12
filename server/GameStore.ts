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
    this.games = this.games.filter(game => game.id !== gameId)
  }

  removePlayerFromGame(sessionId: string): void {
    this.games.forEach((game) => {
      game.players = game.players.filter(player => player.sessionId !== sessionId)
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

  findGameBySessionId(sessionId: string): Game | null {
    let game = this.games.find(game => game.getPlayer(sessionId));
    if (game) return game;
    return null;
  }

  findPlayerBySessionId(sessionId: string): Player | null {
    let game = this.games.find(game => game.getPlayer(sessionId));
    let player = game?.getPlayer(sessionId);
    if (player) return player;
    return null;
  }

  logGames(): void {
    console.log("Game Store")
    console.log("--------------")
    this.games.forEach((game, gameIndex) => {
      console.log(`-- Game ${gameIndex + 1}: ${game.id}`)
      console.log(`-- -- Lobby: ${game.lobbyId}`)
      console.log("-- -- Players")
      game.players.forEach((player, playerIndex) => {
        console.log(`-- -- -- P${playerIndex + 1}: ${player.name}`)
      });
      console.log("")
    })
    console.log("");
  }

}

export const gameStore = new GameStore();