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
  gettingStarted: "gettngStarted",
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
    waitingForJudge: "watchingJudge",
  },
  judge: {
    waitingforSelections: "judgeWaitingForSelections",
    turn: "judgeTurn",
  },
  results: {
    round: "roundResults",
    waitingForNextRound: "wait-for-next-round",
    game: "gameResults",
    waitingForNextGame: "wait-for-next-game",
  },
}