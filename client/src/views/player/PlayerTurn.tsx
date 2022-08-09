import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../components/Buttons/ConfirmDeleteDialogue";
import { ExitLobbyButton, SubmitButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/EVENTS";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import Container from '@mui/material/Container';
import { cardHandSize } from "../../data/constants/cardHandSize";
import { getCurrentPlayer } from "../../data/functions/getPlayer";
import { PlayingCard } from "../../components/Cards/PlayingCard";
import { CardDataType } from "../../data/types/ClassTypes";

export const PlayerTurn = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [ showDialogue, setShowDialogue ] = useState(false);
  const [ selectedCard, setSelectedCard ] = useState<CardDataType | null>(null);

  const submitSelection = (): void => {
    socket?.emit(EVENTS.client.playerSelection, selectedCard);
  }
  
  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  const round = game?.round;
  const player = getCurrentPlayer(game, sessionId);

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>
  
        <Container className="page-container" maxWidth="sm">
        
        <h2 style={{margin: "auto"}}>Round {round.number} - Submit Card</h2>
  
        <hr></hr>
        
        <h3 style={{margin: "auto"}}>{round.judge?.name} is the Judge</h3>
  
        <hr></hr>
  
        </Container>
  
        <PlayingCard
          className={"solo-prompt-card"}
          type="prompt"
          text={round.promptCard.text} 
        />
  
        <div className={"players-hand-container " + cardHandSize[player.cards.length]}>
  
          {player.cards.map((card) => {

            return (
              <PlayingCard 
                key={card.id}
                className="response-card"
                type={ selectedCard?.id === card.id ? "selected" : "response" }
                text={ card.text } 
                onClick={ () => {
                  setSelectedCard(selectedCard?.id === card.id ? null : card)
                }}
              />
            );
            
          })}
  
        </div>
        
        <Container className="page-container" maxWidth="sm">
          <SubmitButton
            onClick={submitSelection}
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
      <div>Error</div>
    )
  }

}