import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../../components/Buttons/ConfirmDeleteDialogue";
import { ExitLobbyShadedButton } from "../../../components/Buttons/Submit";
import { MESSAGES } from "../../../data/constants/messages";
import { ViewPropsType } from "../../../data/types/ViewPropsType";
import { SuccessIcon } from "../../../components/Icons/SuccessIcon";
import { WaitingIcon } from "../../../components/Icons/WaitingIcon";
import { Container } from "@mui/material";
import { getCurrentPlayer } from "../../../data/functions/getPlayer";
import { PlayingCard } from "../../../components/Cards/PlayingCard";

export const WaitingForNextGame = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);
  
  const player = getCurrentPlayer(game, sessionId);

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  if (game) {

  }

  return (
    <div style={{ textAlign: "center" }}>
              
      <Container className="page-container" maxWidth="sm">

        <h2 style={{margin: "auto"}}>New Game</h2>
        
        <hr></hr>
        
        <h3 style={{margin: "auto"}}>Starting a New Game</h3>

        <hr></hr>

        <PlayingCard
          className="solo-prompt-card"
          type="prompt"
          text="Getting all the players rounded up..."/>

        <hr></hr>

        <h3><b><u>Ready for New Game:</u></b></h3>

        {game?.players.map(player => {
          return (
            <p key={player?.name}>
              {player?.name}: {player.readyForNextRound ? <SuccessIcon/> : <WaitingIcon/>}
              </p>
          )
        })}

        <ExitLobbyShadedButton
          text={"Quit Game"}
          type={"submit"}
          disabled={false} 
          onClick={showConfirmDeleteDialogue}
        />

      </Container>

      { showDialogue && 
        <ConfirmDeleteDialogue
          socket={socket}
          setShowDialogue={setShowDialogue}
          messages={[MESSAGES.dialogue.playerEndGame1, MESSAGES.dialogue.playerEndGame2]}
        />
      }

      <div 
        className="no-action-bg">
      </div>

      { process.env.REACT_APP_STAGE === "dev" &&
        <p>Current Player: {player?.name}</p>
      } 


    </div>
  );
} 