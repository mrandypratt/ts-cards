import { Container } from "@mui/material";
import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../../components/Buttons/ConfirmDeleteDialogue";
import { ExitLobbyShadedButton } from "../../../components/Buttons/Submit";
import { PlayingCard } from "../../../components/Cards/PlayingCard";
import { cardHandSize } from "../../../data/constants/cardHandSize";
import { MESSAGES } from "../../../data/constants/messages";
import { getCurrentPlayer } from "../../../data/functions/getPlayer";
import { ViewPropsType } from "../../../data/types/ViewPropsType";



export const PlayerWaitingForJudge = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);
  
  const round = game?.round;
  const player = getCurrentPlayer(game, sessionId);

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>

        <Container className="page-container" maxWidth="sm">

          <h2 style={{margin: "auto"}}>Round {round.number}</h2>
          
          <hr></hr>
    
          <h3 style={{margin: "auto"}}>Judge's Turn</h3>

          <hr></hr>

          <h2>{round.judge?.name} is selecting...</h2>

        </Container>
  
        <PlayingCard 
          className="solo-prompt-card"
          type="prompt"
          text={round.promptCard.text}
          />
  
        <div className={"players-hand-container " + cardHandSize[game.players.length - 1]}>
  
          {round.players.map((player) => {
            let card = player.selectedCard;

            if (card !== null) {
              return (
                <PlayingCard
                  key={card.id}
                  className="response-card"
                  type="response"
                  text={card.text}
                />
              );
            } else {
              return (
                <div>Error: JudgeTurn ResponseCard</div>
              )
            }
          })}
  
        </div>

        <Container className="page-container" maxWidth="sm">

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
          <p>Current Player: {player.name}</p>
        } 
  
      </div>
    );
  } else {
    return (
      <div>Error on JudgeTurn</div>
    )
  }
}