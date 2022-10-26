export const VIEWS = {
  home: "home",

  singlePlayer: {
    createGame: "createSinglePlayerGame",
    findingPlayers: "findingPlayers",
  },

  multiPlayer: {
    home: "multiPlayerHome",
    host: {
      createLobby: "hostCreateLobby",
      inviteParticipants: "hostInviteParticipants"
    },
    guest: {
      joinLobby: "guestJoinLobby",
      waitingForHost: "guestWaitingForHost",
    },
  },

  gameplay: {
    player: {
      turn: "playerTurn",
      selectionMade: "playerSelectionMade",
      waitingForJudge: "playerWaitingForJudge",
    },
    judge: {
      waitingforSelections: "judgeWaitingForSelections",
      turn: "judgeTurn",
    },
    results: {
      round: "resultsRound",
      waitingForNextRound: "resultsWaitingForNextRound",
      game: "resultsGame",
      waitingForNextGame: "resultsWaitingForNextGame",
    },
  },

  info: {
    howToPlay: "howToPlay",
  },
}