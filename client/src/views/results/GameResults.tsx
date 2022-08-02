import { ExitLobbyButton, SubmitButton } from "../../components/Buttons/Submit";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { PromptCard } from "../../components/Cards/PromptCard";
import { RoundResultCardStyle } from "../../components/Containers/PlayersHand";
import { ResultsTable } from "../../components/ResultsTable";
import { VIEWS } from "../../data/types/VIEWS";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../components/Buttons/ConfirmDeleteDialogue";
import { MESSAGES } from "../../data/constants/messages";

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

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  if (round && winner && winningCard) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2 style={{margin: "auto"}}>Round {game.rounds.length + 1}</h2>
        
        <hr></hr>
        
        <h3 style={{margin: "auto"}}>Final Score</h3>

        <hr></hr>
        
        <h1>{ winner.name } is the Winner!</h1>
  
        <div style={RoundResultCardStyle}>

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
  
        <div style={{textAlign: "center", marginTop: 10, display: "flex", width: "100%", justifyContent: "center"}}>
          
          <ResultsTable
            game={game}
            setGame={setGame}
            socket={socket}
            sessionId={sessionId}
          />

        </div>
  
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