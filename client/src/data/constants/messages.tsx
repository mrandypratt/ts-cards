export const MESSAGES = {

  gettingStarted: {
    about: "Cards with Friends is an online clone of Cards Against Humanity.\n\nCwF is designed for friend groups to play whether or not they are in the same room or they have a deck of cards.\n\n",
    creatingGames: "Each game is set up by a host player clicking \"New Game\" to start a lobby. Then they are given a Lobby ID to share with up to 11 guests.\n\nOnce a guest receives the Lobby ID, they can visit the website and click \"Join Lobby\" where they can enter their Lobby ID to join the game.\n\nOnce a lobby has at least 3 total participants, the host can start the game.",
    gameplay: "Every player is dealt 5 response cards. Participants take turns being the Judge, while all the other players try to play the best response to a given prompt using the cards in their hand. The game will tell you who the Judge is, so be sure to keep their sense of humor in mind!\n\nAt the end of the Turn, the Judge will select their favorite card from all submitted cards, which have been shuffled for anonymity. The player who submitted the winning card gets a point, and then the next turn will yield a new judge.\n\nOnce a player reaches 5 points, they are declared the winner!"
  },

  guest: {
    joinLobby: "Please enter the Code provided by the game host.",

    waitingForHost: {
      success: "Success, you joined the lobby!",
      pleaseWait: "The game will begin as soon as the host confirms that all participants have joined."
    }
  },

  player: {
    turn: "Select a response to submit to ",
    responseSubmitted: {
      success: "Your response is submitted!",
      pleaseWait: "Once all players have selected their response, the judge will review and select the winning response"
    }
  },

  judge: {
    waiting: "The players are submitting their funniest cards.",
    turn: "Please select the best response card to win this round."
  },

  dialogue: {
    hostAbandonLobby1: "Leaving now will delete the lobby for all participants.",
    hostAbandonLobby2: "Are you sure you want to quit?",
    guestExitLobby1: "If you leave the lobby, you will need the Lobby ID to join again.",
    guestExitLobby2: "Are you sure you would like to exit the lobby?",
    playerEndGame1: "WARNING: Exiting now will end the game for all players.",
    playerEndGame2: "Are you sure you would like to exit?",
  }
}