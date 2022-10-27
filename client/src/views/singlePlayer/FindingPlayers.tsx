import { CircularProgress, Container } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ConfirmExitLobbyDialogue } from "../../components/Buttons/ConfirmExitLobbyDialogue";
import { ExitLobbyButton } from "../../components/Buttons/Submit";
import { PlayingCard } from "../../components/Cards/PlayingCard";
import { EVENTS } from "../../data/constants/EVENTS";
import { MESSAGES } from "../../data/constants/messages";
import { PlayerDataType } from "../../data/types/ClassTypes";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const FindingPlayers = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [ showDialogue, setShowDialogue ] = useState(false);
  const humanPlayer = game?.players.find(player => player.botId === null)
  const [ playersToDisplay, setPlayersToDisplay ] = useState<PlayerDataType[]>(humanPlayer ? [humanPlayer] : []);
  const [ isLoading, setIsLoading ] = useState(false);
  const playersToDisplayRef = useRef(playersToDisplay);
  playersToDisplayRef.current = playersToDisplay;

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }
  
  useEffect(() => {
    socket.on(EVENTS.server.botJoinsLobby, (bot: PlayerDataType) => {
      setPlayersToDisplay([...playersToDisplayRef.current, bot]);
  
      if (playersToDisplayRef.current.length === game?.players.length) {
        setTimeout(() => {
          setIsLoading(true);

          setTimeout(() => {
            socket.emit(EVENTS.client.singlePlayer.startFirstRound)
          }, 3000)
        }, 1500)
      }
    })
  }, []);
  
  if (!isLoading) {
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
  }

  return (
    <Container className="loading-container" maxWidth="sm">
        <h1>Starting Game...</h1>
        <CircularProgress/>
    </Container>
  );
  
};