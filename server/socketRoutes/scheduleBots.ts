import { Socket } from "socket.io";
import { EVENTS } from "../../client/src/data/constants/EVENTS";
import { VIEWS } from "../../client/src/data/constants/VIEWS";
import { Player } from "../data/classes/Player";
import { Session } from "../data/classes/Session";
import getValidatedData from "../functions/getValidatedData";
import { randomDelay } from "../functions/randomDelay";


const joinLobby = (socket: Socket, session: Session, bot: Player): void => {
  setTimeout(() => {
    socket.emit(EVENTS.server.botJoinsLobby, bot)
  }, randomDelay(2, 1));
}

const playerSelection = (socket: Socket, session: Session, botPlayer: Player): void => {
  setTimeout(() => {
    const {game, round} = getValidatedData.gameRound(session.id)
    
    botPlayer.playRandomCard();
  
    if (round.allSelectionsMade()) {
      round.randomizePlayerOrder();
      
      if (game.isJudge(session.id)) {
        const view = VIEWS.gameplay.judge.turn;
        session.updateView(view);
        socket.emit(EVENTS.server.updateClient, game, view);
      } else if (!game.isJudge(session.id)) {
        const view = VIEWS.gameplay.player.waitingForJudge;
        session.updateView(view);
        socket.emit(EVENTS.server.updateClient, game, view);
      }
    } else if (!round.allSelectionsMade()) {
      if (game.isJudge(session.id)) {
        socket.emit(EVENTS.server.updateGame, game)
      } else if (!game.isJudge(session.id)) {
        socket.emit(EVENTS.server.updateGame, game)
      }
    }
  }, randomDelay(2, 3));
}

const judgeSelection = (socket: Socket, session: Session) => {
  setTimeout(() => {
    const {game, round} = getValidatedData.gameRound(session.id)

    round.selectRandomWinner();
    game.incrementWins();

    if (game.isWinner()) {
      const view = VIEWS.gameplay.results.game;
      session.updateView(view);
      socket.emit(EVENTS.server.updateClient, game, view);
  
      game.getAllBots().forEach(botPlayer => {
        nextGame(socket, session, botPlayer)
      });
    } else {
      const view = VIEWS.gameplay.results.round;
      session.updateView(view);
      socket.emit(EVENTS.server.updateClient, game, view);
  
      game.getAllBots().forEach(botPlayer => {
        nextRound(socket, session, botPlayer)
      });
    }
  }, randomDelay(2, 2));
}

const nextRound = (socket: Socket, session: Session, botPlayer: Player): void => {
  setTimeout(() => {
    const {game, round} = getValidatedData.gameRound(session.id)

    botPlayer.markAsReady()

    if (game.allPlayersReady()) {
      game.startNextRound();

      const view = game.isJudge(session.id) ? VIEWS.gameplay.judge.waitingforSelections : VIEWS.gameplay.player.turn;
      session.updateView(view);
      socket.emit(EVENTS.server.updateClient, game, view);
  
      const round = getValidatedData.round(game);
      const botPlayers = round.getBotPlayers();
      botPlayers.forEach(botPlayer => {
        scheduleBot.playerSelection(socket, session, botPlayer);
      });
    } else if (!game.allPlayersReady()) {
      socket.emit(EVENTS.server.updateGame, game)
    }
  }, randomDelay(2, 2))
}

const nextGame = (socket: Socket, session: Session, botPlayer: Player): void => {
  setTimeout(() => {
    const game = getValidatedData.game(session.id)

    botPlayer.markAsReady()

    if (game.allPlayersReady()) {
      game.startNewGame();

      const view = game.isJudge(session.id) ? VIEWS.gameplay.judge.waitingforSelections : VIEWS.gameplay.player.turn;
      session.updateView(view);
      socket.emit(EVENTS.server.updateClient, game, view);

      const round = getValidatedData.round(game);
      const botPlayers = round.getBotPlayers();
      botPlayers.forEach(botPlayer => {
        scheduleBot.playerSelection(socket, session, botPlayer);
      });
    } else if (!game.allPlayersReady()) {
      socket.emit(EVENTS.server.updateGame, game)
    }
  }, randomDelay(1, 2))
}

const scheduleBot = {
  joinLobby: joinLobby,
  playerSelection: playerSelection,
  judgeSelection: judgeSelection,
  nextRound: nextRound,
  nextGame: nextGame,
}

export default scheduleBot;