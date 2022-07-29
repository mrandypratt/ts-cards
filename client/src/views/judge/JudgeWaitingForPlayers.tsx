import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../components/Buttons/ConfirmDeleteDialogue";
import { ExitLobbyButton } from "../../components/Buttons/Submit";
import { PromptCard } from "../../components/Cards/PromptCard";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { SuccessIcon } from "../../components/Icons/SuccessIcon";
import { WaitingIcon } from "../../components/Icons/WaitingIcon";


export const JudgeWaitingForPlayers = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);
  
  const round = game.round;
  const player = game.getPlayer(sessionId);

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2 style={{margin: "auto"}}>Round {game.rounds.length + 1}</h2>
  
        <hr></hr>
        
        <h3 style={{margin: "auto"}}>You are the Judge</h3>

        <hr></hr>
  
        <PromptCard text={round.promptCard.text} />
  
        <hr></hr>

        <p>Please wait...</p>

        <p>{MESSAGES.judge.waiting}</p>

        <hr></hr>
  
        <h3><b><u>Submissions:</u></b></h3>

        {round.playersSessionIds.map(playerSessionId => {
          let player = game.getPlayer(playerSessionId);
          return (
            <p key={player?.name}>{player?.name}: {round.hasPlayerSelected(playerSessionId) ? <SuccessIcon/> : <WaitingIcon/>}</p>
          )
        })}

        <ExitLobbyButton
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
          <p>Current Player: {player.name}</p>
        } 

      </div>
    );
  } else {
    return (
      <div>Error on JudgeWaitingForPlayers</div>
    )
  }
}