import { Socket } from "socket.io";
import { EVENTS } from "../../client/src/data/constants/EVENTS";
import { VIEWS } from "../../client/src/data/constants/VIEWS";
import { CardDataType } from "../../client/src/data/types/ClassTypes";
import { Game } from "../data/classes/Game";
import { Player } from "../data/classes/Player";
import { gameStore } from "../data/GameStore";
import { faker } from '@faker-js/faker';
import scheduleBot from "./scheduleBots";
import getValidatedData from "../functions/getValidatedData";

const createLobby = (socket: Socket, name: string, NSFW: boolean): void => {
  const session = getValidatedData.session(socket.id);
  
  const game = new Game(null, new Player(null, session.id, name), NSFW)
  .addPlayer(new Player(null, undefined, faker.name.firstName(), true))
  .addPlayer(new Player(null, undefined, faker.name.firstName(), true));
  
  game.setAsSinglePlayer();
  gameStore.addGame(game);
  
  session.updateView(VIEWS.singlePlayer.findingPlayers)
  socket.emit(EVENTS.server.updateClient, game, VIEWS.singlePlayer.findingPlayers)

  game.getAllBots().forEach(bot => {
    scheduleBot.joinLobby(socket, session, bot);
  })
}

const startFirstRound = (socket: Socket): void => {
  const { session, game } = getValidatedData.sessionGame(socket.id);

  game.initializeNewGame()
  const round = getValidatedData.round(game)

  const view = game.isJudge(session.id) ? VIEWS.gameplay.judge.waitingforSelections : VIEWS.gameplay.player.turn;
  session.updateView(view);
  socket.emit(EVENTS.server.updateClient, game, view);

  const botPlayers = round.getBotPlayers();
  botPlayers.forEach(botPlayer => {
    scheduleBot.playerSelection(socket, session, botPlayer);
  });
}

const humanPlayerMakesSelection = (socket: Socket, selectedCard: CardDataType): void => {
  const { session, game, round, player } = getValidatedData.sessionGameRoundPlayer(socket.id);
  
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
  const { session, game, round } = getValidatedData.sessionGameRound(socket.id);
    
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
  const { session, game, player } = getValidatedData.sessionGamePlayer(socket.id);
  
  player.markAsReady()

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

  } else {
    const view = VIEWS.gameplay.results.waitingForNextRound;
    session.updateView(view);
    socket.emit(EVENTS.server.updateClient, game, view);
  }
}

const humanStartsNextGame = (socket: Socket): void => {
  const { session, game, player } = getValidatedData.sessionGamePlayer(socket.id);

  player.markAsReady()

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


// Player is Judge
  // Both bots are Player
// Bot is Judge
  // Humand and Bot are Players




// Scenario 1: Human is Player

// Initial State: Start Game Event with view on Finding Players
  // Update view of client to Player Turn
  // Bot Player needs to select random card after random delay
    // If all selections are not made:
      // Human Game needs to be updated with game state
    // If all Selections are made:
      // Human Game needs to be updated and view to Judge Round

// Scenario 2: Human is Judge

// Initial State: Start Game Event with view on Finding Players
  // Update view of client to Judge waiting for players
  // Bot Players need to select random card after random delay
    // If all selections are not made:
      // Human Game needs to be updated with game state after each selection
    // If all Selections are made:
      // Human Game needs to be updated and view to Judge Round


// Scenario 3: Human is Player & Makes Selection
  // Player is last to make Selection
    // If not overall Game Winner
      // Update Human Game & View to Round Results Page
      // Trigger Bots to move to next round after delay
        // If all are ready for next round
          // Trigger start next Game Event

    // If overall Game Winner
        // Update Human Game & View to Game Results Page

    // Trigger Bot's event to move to the next round after delay


  // Bot is yet to have made a selection (handled on bot's end)
    // Update Human Game & View to Player Selection Made