export type ViewsType = {
  home: string,
  gettingStarted: string,
  hostCreateLobby: string,
  hostInviteParticipants: string,
  guestJoinLobby: string,
  guestWaitingForHost: string,
  playerTurn: string,
  playerSelectionMade: string,
  judgeWaitingForSelections: string,
  judgeTurn: string,
  roundResults: string,
  gameResults: string,
  currentPlayer: number | null,
}

export const VIEWS = {
  home: "home",
  gettingStarted: "gettngStarted",
  hostCreateLobby: "hostCreateLobby",
  hostInviteParticipants: "hostInviteParticipants",
  guestJoinLobby: "guestJoinLobby",
  guestWaitingForHost: "guestWaitingForHost",
  playerTurn: "playerTurn",
  playerSelectionMade: "playerSelectionMade",
  judgeWaitingForSelections: "judgeWaitingForSelections",
  judgeTurn: "judgeTurn",
  roundResults: "roundResults",
  gameResults: "gameResults",
  currentPlayer: null,
}


export type ViewType = string | number;