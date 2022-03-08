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
    watchingJudge: string,
  },
  judge: {
    waitingforSelections: string,
    turn: string
  },
  results: {
    round: string,
    game: string
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
    watchingJudge: "watchingJudge",
  },
  judge: {
    waitingforSelections: "judgeWaitingForSelections",
    turn: "judgeTurn",
  },
  results: {
    round: "roundResults",
    game: "gameResults"
  },
}