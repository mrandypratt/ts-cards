export const VIEWS = {
  home: "home",
  feedback: "feedback",
  gettingStarted: "gettingStarted",
  host: {
    createLobby: "hostCreateLobby",
    inviteParticipants: "hostInviteParticipants"
  },
  guest: {
    joinLobby: "guestJoinLobby",
    waitingForHost: "guestWaitingForHost",
  },
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
}