export const EVENTS = {
  // Events triggered by Client
  client: {
    updateView: "updateViewOnServer",
    createLobby: "createLobby",
    joinLobby: "joinLobby",
    createSinglePlayerGame: "createSinglePlayerGame",
    startSinglePlayerGame: "startSinglePlayerGame",
    startFirstRound: "startFirstRound",
    playerSelection: "playerSelection",
    judgeSelection: "judgeSelection",
    startNextRound: "startNextRound",
    startNextGame: "startNextGame",

    
    
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
    updateClient: "updateViewAndGameOnClient",
    invalidLobbyId: "invalidLobbyId",
  },
}