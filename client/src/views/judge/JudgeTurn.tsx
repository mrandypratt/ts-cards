import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../components/Buttons/ConfirmDeleteDialogue";
import { ExitLobbyButton, SubmitButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/EVENTS";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import Container from '@mui/material/Container';
import { cardHandSize } from "../../data/constants/cardHandSize";
import { getCurrentPlayer } from "../../data/functions/getPlayer";
import { CardDataType } from "../../data/types/ClassTypes";
import { PlayingCard } from "../../components/Cards/PlayingCard";

export const JudgeTurn = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [ showDialogue, setShowDialogue ] = useState(false);
  const [ selectedCard, setSelectedCard ] = useState<CardDataType | null>(null);

  const round = game?.round;
  const player = getCurrentPlayer(game, sessionId);

  const selectWinner = (): void => {
    socket.emit(EVENTS.client.judgeSelection, selectedCard);
  }

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

          <h2>Select the Winning Card</h2>

        </Container>
  
        <PlayingCard 
          className={"solo-prompt-card"}
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
                  type={ selectedCard?.id === card?.id ? "selected" : "response" }
                  text={ card.text } 
                  onClick={ () => {
                    setSelectedCard(selectedCard?.id === card?.id ? null : card)
                  }}
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
  
          <SubmitButton
            onClick={selectWinner}
            disabled={!selectedCard}
            type="button"
            text="Submit Card"
          />

          <ExitLobbyButton
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