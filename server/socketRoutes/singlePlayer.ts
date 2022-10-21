import { Socket } from "socket.io";
import { EVENTS } from "../../client/src/data/constants/EVENTS";
import { VIEWS } from "../../client/src/data/constants/VIEWS";
import { CardDataType } from "../../client/src/data/types/ClassTypes";
import { Game } from "../data/classes/Game";
import { Player } from "../data/classes/Player";
import { gameStore } from "../data/GameStore";
import { faker } from '@faker-js/faker';
import scheduleBot from "./scheduleBots";
import { getBackendData } from "../functions/getBackendData";
import { sessionStore } from "../data/SessionStore";

const createLobby = (socket: Socket, name: string, NSFW: boolean): void => {
  const session = sessionStore.findSessionBySocketId(socket.id);
  if (!session) return;
  
  const game = new Game(null, new Player(null, session.id, name), NSFW)
  .addPlayer(new Player(null, undefined, faker.name.firstName(), true))
  .addPlayer(new Player(null, undefined, faker.name.firstName(), true));
  
  game.setAsSinglePlayer();
  gameStore.addGame(game);
  
  session.updateView(VIEWS.singlePlayer.findingPlayers)
  socket.emit(EVENTS.server.updateClient, game, VIEWS.singlePlayer.findingPlayers)

  game.getAllBots().forEach(bot => {
    scheduleBot.joinLobby(socket, bot);
  })
}

const startFirstRound = (socket: Socket): void => {
  const { session, game } = getBackendData(socket.id);
  if (!(session && game)) return;

  game.initializeNewGame()
  
  const view = game.isJudge(session.id) ? VIEWS.gameplay.judge.waitingforSelections : VIEWS.gameplay.player.turn;
  session.updateView(view);
  socket.emit(EVENTS.server.updateClient, game, view);
  
  const round = game.round;
  if (!round) return;

  round.getBotPlayers().forEach(botPlayer => {
    scheduleBot.playerSelection(socket, session, botPlayer);
  });
}

const humanPlayerMakesSelection = (socket: Socket, selectedCard: CardDataType): void => {
  const { session, game, round, player } = getBackendData(socket.id);
  if (!(session && game && round && player)) return;

  player.playCard(selectedCard);

  // Update View Based on whether player made last selection
  if (round.allSelectionsMade()) {
    round.randomizePlayerOrder();

    const view = VIEWS.gameplay.player.waitingForJudge;
    session.updateView(view)
    socket.emit(EVENTS.server.updateClient, game, view);

    // Schedule Bot's Judge Selection
    scheduleBot.judgeSelection(socket, session);

  } else if (!round.allSelectionsMade()) {
    const view = VIEWS.gameplay.player.selectionMade;
    session.updateView(view)
    socket.emit(EVENTS.server.updateClient, game, view);
  }
}

const humanJudgeMakesSelection = (socket: Socket, selectedCard: CardDataType): void  => {
  const { session, game, round } = getBackendData(socket.id);
  if (!(session && game && round)) return;
    
  round.setWinner(selectedCard);
  game.incrementWins();

  if (game.isWinner()) {
    const view = VIEWS.gameplay.results.game;
    session.updateView(view)
    socket.emit(EVENTS.server.updateClient, game, view);

    game.getAllBots().forEach(botPlayer => {
      scheduleBot.nextGame(socket, session, botPlayer);
    });
  } else {
    const view = VIEWS.gameplay.results.round;
    session.updateView(view)
    socket.emit(EVENTS.server.updateClient, game, view);

    game.getAllBots().forEach(botPlayer => {
      scheduleBot.nextRound(socket, session, botPlayer);
    });
  }
}

const humanStartsNextRound = (socket: Socket): void => {
  const { session, game, player } = getBackendData(socket.id);
  if (!(session && game && player)) return;
    
  player.markAsReady()

  if (game.allPlayersReady()) {
    game.startNextRound();

    const view = game.isJudge(session.id) ? VIEWS.gameplay.judge.waitingforSelections : VIEWS.gameplay.player.turn;
    session.updateView(view);
    socket.emit(EVENTS.server.updateClient, game, view);

    const round = game.round;
    if (!round) return;

    round.getBotPlayers().forEach(botPlayer => {
      scheduleBot.playerSelection(socket, session, botPlayer);
    });
  } else {
    const view = VIEWS.gameplay.results.waitingForNextRound;
    session.updateView(view);
    socket.emit(EVENTS.server.updateClient, game, view);
  }
}

const humanStartsNextGame = (socket: Socket): void => {
  const { session, game, player } = getBackendData(socket.id);
  if (!(session && game && player)) return;

  player.markAsReady()

  if (game.allPlayersReady()) {
    game.startNewGame();

    const view = game.isJudge(session.id) ? VIEWS.gameplay.judge.waitingforSelections : VIEWS.gameplay.player.turn;
    session.updateView(view);
    socket.emit(EVENTS.server.updateClient, game, view);

    const round = game.round;
    if (!round) return;

    round.getBotPlayers().forEach(botPlayer => {
      scheduleBot.playerSelection(socket, session, botPlayer);
    });
    
  } else {
    const view = VIEWS.gameplay.results.waitingForNextGame;
    session.updateView(view);
    socket.emit(EVENTS.server.updateClient, game, view)
  }
}

const singlePlayer = {
  createLobby: createLobby,
  startFirstRound: startFirstRound,
  humanPlayerMakesSelection: humanPlayerMakesSelection,
  humanJudgeMakesSelection: humanJudgeMakesSelection,
  humanStartsNextRound: humanStartsNextRound,
  humanStartsNextGame: humanStartsNextGame,
}

export default singlePlayer;