export const MESSAGES = {
  home: {
    welcomeBanner: "Welcome to Cards with Friends!",
    getStarted1: "This game is inspired by Cards Against Humanity and the fun of playing games online with friends!",
  },

  gettingStarted: {
    about: "Cards with Friends is a Prompt/Response game inspired by Cards Against Humanity.\n\nCwF is designed for friend groups to play whether or not they are in the same room or they have a deck of cards.\n\n",
    creatingGames: "Each game is set up by a host player clicking \"New Game\" to start a lobby. Then they are given a Lobby ID to share with up to 11 guests.\n\nOnce a guest receives the Lobby ID, they can visit the website and click \"Join Lobby\" where they can enter their Lobby ID to join the game.\n\nOnce a lobby has at least 3 total participants, the host can start the game.",
    gameplay: "Every player is dealt 5 response cards. Participants take turns being the Judge, while all the other players try to play the best response to a given prompt using the cards in their hand. The game will tell you who the Judge is, so be sure to keep their sense of humor in mind!\n\nAt the end of the Turn, the Judge will select their favorite card from all submitted cards, which have been shuffled for anonymity. The player who submitted the winning card gets a point, and then the next turn will yield a new judge.\n\nOnce a player reaches 5 points, they are declared the winner!"
  },

  host: {
    startNewGame: "Enter your name and select game type before inviting friends.",
  
    inviteParticipants: {
      shareLobbyID: "Share the Lobby ID with your friends so they can join",
      minimumPlayers: "A lobby must have at least 3 participants to start the game."
    },
  },

  guest: {
    joinLobby: "To join a lobby, please enter the Lobby ID provided by the lobby host along with your name as it will appear in the game.",

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
    waiting: "Once all players have selected their response, you will have the chance to review and select the winning response.",
    turn: "Please select the best response card to win this round."
  }
}