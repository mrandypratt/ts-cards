export type ViewsType = {
  enterPlayers: "enter-players",
  selectPlayer: "player-select",
  judge: "judge-view",
  declareWinner: "declare-winner",
  currentPlayer: number | null,
}

export type ViewType = 
"enter-players" |
"player-select" |
"judge-view" |
"declare-winner" |
number|
null;