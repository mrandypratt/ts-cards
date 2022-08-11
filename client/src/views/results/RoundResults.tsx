import { ExitLobbyButton, SubmitButton } from "../../components/Buttons/Submit";
import { ResultsTable } from "../../components/ResultsTable";
import { EVENTS } from "../../data/constants/EVENTS";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../components/Buttons/ConfirmDeleteDialogue";
import { MESSAGES } from "../../data/constants/messages";
import { Container } from "@mui/material";
import { cardHandSize } from "../../data/constants/cardHandSize";
import { getCurrentPlayer } from "../../data/functions/getPlayer";
import { PlayingCard } from "../../components/Cards/PlayingCard";

export const RoundResults = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);
  
  const round = game?.round;
  const player = getCurrentPlayer(game, sessionId);
  const winner = round?.winner;
  const winningCard = winner?.selectedCard;

  const startNextRound = () => {
    socket.emit(EVENTS.client.startNextRound);
  }

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  if (round && player && winner && winningCard) {
    return (
      <div style={{ textAlign: "center" }}>

        <Container className="page-container" maxWidth="sm">

          <h2 style={{margin: "auto"}}>Round {round.number}</h2>
            
          <hr></hr>
          
          { player.sessionId === round.winner?.sessionId &&
            <h2 style={{margin: "auto"}}>You won the round!</h2>
          }

          { player.sessionId !== round.winner?.sessionId &&
            <h3 style={{margin: "auto"}}>{ round.winner?.name } won {"the round"}!</h3>
          }

          <hr></hr>

          <div style={{textAlign: "center", marginTop: 10, display: "flex", width: "100%", justifyContent: "center"}}>
            
            <ResultsTable
              game={game}
            />

          </div>

          <hr></hr>
          
          <h4 style={{margin: "auto", marginBottom: "0.5rem"}}>Winning Card</h4>

        </Container>
        
        <div className="winning-card-container two-card-hand">

          <PlayingCard
            className="prompt-card-results"
            type="prompt"
            text={round.promptCard.text}
          />

          <PlayingCard
            className="response-card-results winner"
            type="response"
            text={winningCard.text}
            playerName={winner.name}
          />

        </div>

        <h4 style={{margin: "auto", marginTop: "0.5rem", marginBottom: "0.5rem"}}>Other Player Submissions</h4>

        <div className={"winning-card-container " + cardHandSize[game.players.length - 2]}>

          {round.players.map(player => {
            return (
              <PlayingCard
                key={player.sessionId}
                className="response-card-results"
                type="response"
                text={player.selectedCard?.text || "Error"}
                playerName={player.name}
              />
            )
          })}
              
          </div>
  
        <Container className="page-container" maxWidth="sm">

          <SubmitButton
            onClick={() => startNextRound()}
            type="button"
            text="Next Round"
            disabled={false}
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
          <p>Current Player: {player?.name}</p>
        } 
      </div>
    )
  } else {
    return (
      <div>Error</div>
    )
  }
}