
import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../components/Buttons/ConfirmDeleteDialogue";
import { ExitLobbyShadedButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { SuccessIcon } from "../../components/Icons/SuccessIcon";
import { WaitingIcon } from "../../components/Icons/WaitingIcon";
import { PromptCard } from "../../components/Cards/PromptCard";
import { Container } from "@mui/material";

export const PlayerSelectionMade = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);
  
  const round = game.round;
  const player = game.getPlayer(sessionId);

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  if (round && player) {
    return (
      <Container className="page-container" maxWidth="sm">

        <h2 style={{margin: "auto"}}>Round {game.rounds.length + 1}</h2>

        <hr></hr>
                
        <h3 style={{margin: "auto"}}>{MESSAGES.player.responseSubmitted.success}</h3>
  
        <hr></hr>

        <p>Please Wait...</p>

        <PromptCard
          text="Other players are making their selections."
          className="solo-prompt-card"
        />
        
        <hr></hr>
  
        <h3><b><u>Submissions:</u></b></h3>

        {round.playersSessionIds.map(playerSessionId => {
          let player = game.getPlayer(playerSessionId);
          return (
            <p key={player?.name}>{player?.name} {round.hasPlayerSelected(playerSessionId) ? <SuccessIcon/> : <WaitingIcon/>}</p>
          )
        })}

        <ExitLobbyShadedButton
          text={"Quit Game"}
          type={"submit"}
          disabled={false} 
          onClick={showConfirmDeleteDialogue}
        />
        
        { showDialogue && 
          <ConfirmDeleteDialogue
            game={game}
            socket={socket}
            setShowDialogue={setShowDialogue}
            messages={[MESSAGES.dialogue.playerEndGame1, MESSAGES.dialogue.playerEndGame2]}
          />
        }

        { process.env.REACT_APP_STAGE === "dev" &&
          <p>Current Player: {player?.name}</p>
        } 

        <div 
          className="no-action-bg">
        </div>
      </Container>
    );
  } else {
    return (
      <div>Error on Player Selection Made</div>
    )
  }
}