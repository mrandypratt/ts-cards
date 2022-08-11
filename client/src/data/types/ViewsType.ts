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