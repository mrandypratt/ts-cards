import { Server, Socket } from "socket.io";
import { EVENTS } from "../../client/src/data/constants/EVENTS";
import { VIEWS } from "../../client/src/data/constants/VIEWS";
import { CardDataType } from "../../client/src/data/types/ClassTypes";
import { Game } from "../data/classes/Game";
import { Player } from "../data/classes/Player";
import { gameStore } from "../data/GameStore";
import { sessionStore } from "../data/SessionStore";
import { getBackendData } from "../functions/getBackendData";

const createLobby = (socket: Socket, io: Server, name: string, NSFW: boolean): void => {
  const session = sessionStore.findSessionBySocketId(socket.id);
  if (!session) return;
  
  const nextView = VIEWS.multiPlayer.host.inviteParticipants
  
  const game = new Game(null, new Player(null, session.id, name), NSFW);
  gameStore.addGame(game);
  
  socket.join(game.id);

  sessionStore.findSession(session.id)?.updateLobby(game.id)

  sessionStore.findSession(session.id)?.updateView(nextView)

  io.to(game.id).emit(EVENTS.server.updateClient, game, nextView)
}

const joinLobby = (socket: Socket, lobbyId: string, name: string): void => {
  lobbyId = lobbyId.toUpperCase();
        
  const session = sessionStore.findSessionBySocketId(socket.id);
  const game = gameStore.findGameByLobbyId(lobbyId);

  if (!(session && game)) {
    socket.emit(EVENTS.server.invalidLobbyId, lobbyId)
    return;
  }
  
  game.addPlayer(new Player(null, session.id, name))
  
  socket.join(game.id);
  
  session.updateLobby(game.id)
  
  const nextView = VIEWS.multiPlayer.guest.waitingForHost;
  session.updateView(nextView)
  socket.emit(EVENTS.server.updateClient, game, nextView)

  socket.to(lobbyId).emit(EVENTS.server.updateGame, game);
}

const startFirstRound = (socket: Socket, io: Server): void => {
  const session = sessionStore.findSessionBySocketId(socket.id);
  const game = gameStore.findGameBySessionId(session ? session.id : "");

  if (!(session && game)) return;

  game.initializeNewGame();

  const judgePlayer = game.getJudgePlayer();
  if (!judgePlayer) return;

  const judgeView = VIEWS.gameplay.judge.waitingforSelections;
  
  sessionStore.findSession(judgePlayer.sessionId)?.updateView(judgeView);
  
  const judgeSocketId = sessionStore.getSocketId(judgePlayer.sessionId)
  io.to(judgeSocketId).emit(EVENTS.server.updateClient, game, judgeView);

  const players = game.getNonJudgePlayers();
  const playerView = VIEWS.gameplay.player.turn;

  players.forEach((player) => {
    sessionStore.findSession(player.sessionId)?.updateView(playerView);

    const playerSocketId = sessionStore.getSocketId(player.sessionId)
    io.to(playerSocketId).emit(EVENTS.server.updateClient, game, playerView);
  })
}
const playerSelection = (socket: Socket, io: Server, selectedCard: CardDataType): void => {
  const { session, game, round, player} = getBackendData(socket.id)
  if (!(session && game && round && player)) return;

  player.playCard(selectedCard)

  if (round.allSelectionsMade()) {

    round.randomizePlayerOrder();

    const judgePlayer = game.getJudgePlayer();
    if (!judgePlayer) return;
    const judgeView = VIEWS.gameplay.judge.turn;

    sessionStore.findSession(judgePlayer.sessionId)?.updateView(judgeView);
    
    const judgeSocketId = sessionStore.getSocketId(judgePlayer.sessionId)
    io.to(judgeSocketId).emit(EVENTS.server.updateClient, game, judgeView);

    const players = game.getNonJudgePlayers();
    const playerView = VIEWS.gameplay.player.waitingForJudge;

    players.forEach((player) => {
      sessionStore.findSession(player.sessionId)?.updateView(playerView);

      const playerSocketId = sessionStore.getSocketId(player.sessionId)
      io.to(playerSocketId).emit(EVENTS.server.updateClient, game, playerView);
    })
  } else {
    const nextView = VIEWS.gameplay.player.selectionMade;
    session.updateView(nextView)
    socket.emit(EVENTS.server.updateClient, game, nextView)

    socket.to(game.id).emit(EVENTS.server.updateGame, game);
  }
}
const judgeSelection = (socket: Socket, io: Server, selectedCard: CardDataType): void => {
  const { session, game, round, player} = getBackendData(socket.id)
  if (!(session && game && round && player)) return;

  round.setWinner(selectedCard);
  game.incrementWins();

  const nextView = VIEWS.gameplay.results[game.winner ? "game" : "round"]

  game.players.forEach(player => {
    sessionStore.findSession(player.sessionId)?.updateView(nextView)
  })
  io.to(game.id).emit(EVENTS.server.updateClient, game, nextView)
}

const startNextRound = (socket: Socket, io: Server): void => {
  const { session, game, round, player} = getBackendData(socket.id)
  if (!(session && game && round && player)) return;

  player.markAsReady()

  if (!game.allPlayersReady()) {
    const nextView = VIEWS.gameplay.results.waitingForNextRound
    sessionStore.findSession(player.sessionId)?.updateView(nextView)
    socket.emit(EVENTS.server.updateClient, game, nextView)

    socket.to(game.id).emit(EVENTS.server.updateGame, game);
  } else {
    game.players.forEach(player => {
      player.readyForNextRound = false;
      player.selectedCard = null;
    })

    game.startNextRound();

    const judgePlayer = game.getJudgePlayer();
    if (!judgePlayer) return;

    const judgeView = VIEWS.gameplay.judge.waitingforSelections;
    sessionStore.findSession(judgePlayer.sessionId)?.updateView(judgeView);
    
    const judgeSocketId = sessionStore.getSocketId(judgePlayer.sessionId)
    io.to(judgeSocketId).emit(EVENTS.server.updateClient, game, judgeView);

    const players = game.getNonJudgePlayers();
    const playerView = VIEWS.gameplay.player.turn;

    players.forEach((player) => {
      sessionStore.findSession(player.sessionId)?.updateView(playerView);
      const playerSocketId = sessionStore.getSocketId(player.sessionId)
      io.to(playerSocketId).emit(EVENTS.server.updateClient, game, playerView);
    })
  }
}

const startNextGame = (socket: Socket, io: Server): void => {
  const { session, game, player} = getBackendData(socket.id)
  if (!(session && game && player)) return;
  
  player.markAsReady()

  if (!game.allPlayersReady()) {
    const nextView = VIEWS.gameplay.results.waitingForNextGame;
    session.updateView(nextView);
    socket.emit(EVENTS.server.updateClient, game, nextView);
    
    socket.to(game.id).emit(EVENTS.server.updateGame, game);
  } else {
    game.startNewGame();

    const judgePlayer = game.getJudgePlayer();
    if (!judgePlayer) return;

    const judgeView = VIEWS.gameplay.judge.waitingforSelections;
    sessionStore.findSession(judgePlayer.sessionId)?.updateView(judgeView);
    const judgeSocketId = sessionStore.getSocketId(judgePlayer.sessionId)
    io.to(judgeSocketId).emit(EVENTS.server.updateClient, game, judgeView);

    const players = game.getNonJudgePlayers();
    const playerView = VIEWS.gameplay.player.turn;

    players.forEach((player) => {
      sessionStore.findSession(player.sessionId)?.updateView(playerView);

      const playerSocketId = sessionStore.getSocketId(player.sessionId)
      io.to(playerSocketId).emit(EVENTS.server.updateClient, game, playerView);
    })
  }
}

const multiPlayer = {
  createLobby: createLobby,
  joinLobby: joinLobby,
  startFirstRound: startFirstRound,
  playerSelection: playerSelection,
  judgeSelection: judgeSelection,
  startNextRound: startNextRound,
  startNextGame: startNextGame,
};

export default multiPlayer;