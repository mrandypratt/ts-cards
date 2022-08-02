import { ExitLobbyButton, SubmitButton } from "../../components/Buttons/Submit";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { PromptCard } from "../../components/Cards/PromptCard";
import { ResultsTable } from "../../components/ResultsTable";
import { VIEWS } from "../../data/types/VIEWS";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../components/Buttons/ConfirmDeleteDialogue";
import { MESSAGES } from "../../data/constants/messages";
import { Container } from "@mui/material";
import { cardHandSize } from "../../data/constants/cardHandSize";

export const RoundResults = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);
  
  const round = game.round;
  const winner = game.getRoundWinner()
  const winningCard = game.round?.winningCard ? game.round?.winningCard : undefined;
  const player = game.getPlayer(sessionId)

  const startNextRound = () => {
    game.setView(sessionId, VIEWS.results.waitingForNextRound);
    setGame(game.clone());
    socket.emit(EVENTS.startNextRound, game);
  }

  const startNewGame = () => {
    game.setView(sessionId, VIEWS.results.waitingForNextGame);
    setGame(game.clone());
    socket.emit(EVENTS.startNewGame, game);
  }

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  if (round && winner && winningCard) {
    return (
      <div style={{ textAlign: "center" }}>

        <Container className="page-container" maxWidth="sm">

          <h2 style={{margin: "auto"}}>Round {game.rounds.length + 1}</h2>
            
          <hr></hr>
          
          <h2 style={{margin: "auto"}}>{ winner.name } won {game.isGameWinner() ? "the game" : "the round"}!</h2>

          <hr></hr>


          <div style={{textAlign: "center", marginTop: 10, display: "flex", width: "100%", justifyContent: "center"}}>
            
            <ResultsTable
              game={game}
              setGame={setGame}
              socket={socket}
              sessionId={sessionId}
              />

          </div>


        <hr></hr>
        <h4 style={{margin: "auto", marginBottom: "0.5rem"}}>Winning Card</h4>

        </Container>
        
        <div className="winning-card-container two-card-hand">

          <PromptCard
            className="prompt-card-results"
            text={round.promptCard.text}
          />

          <ResponseCard
            className="response-card-results"
            player={winner}
            card={winningCard}
            game={game}
            setGame={setGame}
            sessionId={sessionId}
          />

        </div>

        <h4 style={{margin: "auto", marginTop: "0.5rem", marginBottom: "0.5rem"}}>Other Player Submissions</h4>
        <div className={"winning-card-container " + cardHandSize[game.players.length - 2]}>


          {game.players.map(player => {
            let selectedCard = round.getSelection(player.sessionId)

            if (selectedCard && player.sessionId !== round.winnerSessionId) {
              return (
                <ResponseCard
                  className="response-card-results"
                  player={player}
                  card={selectedCard}
                  game={game}
                  setGame={setGame}
                  sessionId={sessionId}
                />
              )
            }
          })}

          </div>
  

        <Container className="page-container" maxWidth="sm">

          {!game.isGameWinner() && <SubmitButton
            onClick={() => startNextRound()}
            type="button"
            text="Next Round"
            disabled={false}
          />}

          {game.isGameWinner() && <SubmitButton
            onClick={() => startNewGame()}
            type="button"
            text="Start New Game"
            disabled={false}
          />}

          <ExitLobbyButton
            text={"Quit Game"}
            type={"submit"}
            disabled={false} 
            onClick={showConfirmDeleteDialogue}
          />

        </Container>

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
      </div>
    )
  } else {
    return (
      <div>Error</div>
    )
  }

}