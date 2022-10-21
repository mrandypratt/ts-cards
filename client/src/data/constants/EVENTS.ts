export const EVENTS = {
  // Events triggered by Client
  client: {
    updateView: "updateViewOnServer",

    multiPlayer: {
      createLobby: "multiPlayerCreateLobby",
      joinLobby: "multiPlayerJoinLobby",
      startFirstRound: "multiPlayerStartFirstRound",
      playerSelection: "multiPlayerPlayerSelection",
      judgeSelection: "multiPlayerJudgeSelection",
      startNextRound: "multiPlayerStartNextRound",
      startNextGame: "multiPlayerStartNextGame",
    },

    singlePlayer: {
      createLobby: "singlePlayerCreateLobby",
      // STUB: findingPlayers event is not used on backend, logic is currently on front end
      findingPlayers: "singlePlayerFindPlayers",
      startFirstRound: "singlePlayerStartFirstRound",
      playerSelection: "singlePlayerPlayerSelection",
      judgeSelection: "singlePlayerJudgeSelection",
      startNextRound: "singlePlayerStartNextRound",
      startNextGame: "singlePlayerStartNextGame",
    },

    deleteLobby: "deleteLobby",
    exitLobby: "exitLobby",

    resetAllClients: "resetAllClients",
    resetClient: "resetClient",
    deleteGameFromStore: "deleteGameFromStore",
  },
  
  // Events triggered on Server
  server: {
    newSession: "newSession",
    existingSession: "existingSession",
    updateView: "updateViewOnClient",
    updateGame: "updateGameOnClient",
    botJoinsLobby: "botJoinsLobby",
    updateClient: "updateViewAndGameOnClient",
    invalidLobbyId: "invalidLobbyId",
  },
}