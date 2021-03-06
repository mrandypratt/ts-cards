import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../components/Buttons/ConfirmDeleteDialogue";
import { ExitLobbyButton } from "../../components/Buttons/Submit";
import { PromptCard } from "../../components/Cards/PromptCard";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/types/VIEWS";
import { SuccessIcon } from "../../components/Icons/SuccessIcon";
import { WaitingIcon } from "../../components/Icons/WaitingIcon";

export const WaitingForNextRound = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);
  
  const player = game.getPlayer(sessionId);

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  return (
    <div style={{ textAlign: "center" }}>

      <h2 style={{margin: "auto"}}>Round {game.rounds.length + 1}</h2>
      
      <hr></hr>
      
      <h3 style={{margin: "auto"}}>Moving to Next Round</h3>

      <hr></hr>

      <PromptCard text="Waiting for all players to move to next round..."/>

      <hr></hr>

      <h3><b><u>Ready for Next Round:</u></b></h3>

      {game.players.map(player => {
        return (
          <p key={player?.name}>{player?.name}: {player?.view === VIEWS.results.waitingForNextRound ? <SuccessIcon/> : <WaitingIcon/>}</p>
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

      <div 
        className="no-action-bg">
      </div>

      { process.env.REACT_APP_STAGE === "dev" &&
        <p>Current Player: {player?.name}</p>
      } 


    </div>
  );
} 