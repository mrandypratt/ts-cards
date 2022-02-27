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
  },
  judge: {
    waitingforSelections: string,
    turn: string
  },
  results: {
    round: string,
    game: string
  },
  currentPlayer: number | null,
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
  },
  judge: {
    waitingforSelections: "judgeWaitingForSelections",
    turn: "judgeTurn",
  },
  results: {
    round: "roundResults",
    game: "gameResults"
  },
  currentPlayer: null,
}


export type ViewType = string | number;