import { ExitLobbyButton, SubmitButton } from "../../components/Buttons/Submit";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { PromptCard } from "../../components/Cards/PromptCard";
import { RoundResultCardStyle } from "../../components/Containers/PlayersHand";
import { ResultsTable } from "../../components/ResultsTable";
import { VIEWS } from "../../data/types/VIEWS";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const RoundResults = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
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

  const quitGame = () => {
    socket.emit(EVENTS.deleteLobby, game);
  }

  if (round && winner && winningCard) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2>Round {game.rounds.length} | {player?.name}</h2>

        <hr></hr>

        <h2>Results</h2>
  
        <h1>{ winner.name } won {game.isGameWinner() ? "the game" : "the round"}!</h1>
  
        <div style={RoundResultCardStyle}>

          <PromptCard
            text={round.promptCard.text}
          />

          <ResponseCard
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
          onClick={quitGame}
        />
      </div>
    )
  } else {
    return (
      <div>Error</div>
    )
  }

}