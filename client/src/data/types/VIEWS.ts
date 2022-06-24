export type ViewsType = {
  home: string,
  gettingStarted: string,
  host: {
    createLobby: string,
    inviteParticipants: string,
  },
  guest: {
    joinLobby: string,
    waitingForHost: string,
  },
  player: {
    turn: string,
    selectionMade: string,
    waitingForJudge: string,
  },
  judge: {
    waitingforSelections: string,
    turn: string
  },
  results: {
    round: string,
    waitingForNextRound: string,
    game: string,
    waitingForNextGame: string,
  },
}

export const VIEWS = {
  home: "home",
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