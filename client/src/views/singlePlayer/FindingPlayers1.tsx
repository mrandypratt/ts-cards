import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { ConfirmExitLobbyDialogue } from "../../components/Buttons/ConfirmExitLobbyDialogue";
import { ExitLobbyButton } from "../../components/Buttons/Submit";
import { PlayingCard } from "../../components/Cards/PlayingCard";
import { EVENTS } from "../../data/constants/EVENTS";
import { MESSAGES } from "../../data/constants/messages";
import { PlayerDataType } from "../../data/types/ClassTypes";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const FindingPlayers = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [ showDialogue, setShowDialogue ] = useState(false);

  const humanPlayer = game?.players.find(player => player.bot === false)
  const botPlayers = game?.players.filter(player => player.bot === true)

  const [ playersToDisplay, setPlayersToDisplay ] = useState<PlayerDataType[]>(humanPlayer ? [humanPlayer] : []);
  
  useEffect(() => {
    const updatePlayersToDisplay = (botPlayer: PlayerDataType, delayInMS: number): void => {
      setTimeout(() => {
        const currentPlayers = playersToDisplay;
        
        currentPlayers.push(botPlayer);
        setPlayersToDisplay(currentPlayers)
      
        console.log("Bot Update")
      }, delayInMS)
    }
    
    botPlayers?.forEach((botPlayer, botPlayerIndex) => {
      const delayInMSPerBot = 2000;
      const delayInMS = delayInMSPerBot * (botPlayerIndex + 1);
      
      console.log("Bot Loop")
      updatePlayersToDisplay(botPlayer, delayInMS)
    })
    
  })
  
  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  const startGame = () => {
    console.log("Start Game")
    socket.emit(EVENTS.client.startSinglePlayerGame , game)
  }
  
  
  return (
    <Container className="page-container" maxWidth="sm">   

      <h1><b>Game Lobby</b></h1>

      <hr></hr>

      <h3 style={{margin: "auto"}}>Finding Players...</h3>

      <hr></hr>

      <PlayingCard
        className="solo-prompt-card"
        type="prompt"
        text="Please wait while we match you with other players."
      />

      <hr></hr>

      <div>

        <h3><b><u>Players in Lobby:</u></b></h3>

        {playersToDisplay.map(participant => {
          return (
            <p key={participant.sessionId + participant.name}>{participant.name}</p>
            )
          })}

      </div>

      <ExitLobbyButton
        text={"Exit Lobby"}
        type={"submit"}
        disabled={false} 
        onClick={showConfirmDeleteDialogue}
      />

      { showDialogue && 
        <ConfirmExitLobbyDialogue
          socket={socket}
          setShowDialogue={setShowDialogue}
          messages={[MESSAGES.dialogue.guestExitLobby1, MESSAGES.dialogue.guestExitLobby2]}
        />
      }

    </Container>
  );
};