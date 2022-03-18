import { SubmitButton } from "../../components/Buttons/Submit";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { Game } from "../../data/classes/Game";
import { Socket } from "socket.io-client";
import { PromptCard } from "../../components/Cards/PromptCard";
import { RoundResultCardStyle } from "../../components/Containers/PlayersHand";
import { ResultsTable } from "../../components/ResultsTable";
import { VIEWS } from "../../data/types/VIEWS";
import { EVENTS } from "../../data/constants/socketEvents";

type RoundResultsViewProps = {
  game: Game;
  setGame: (game: Game) => void;
  socket: Socket;
}

export const RoundResults = ({ game, setGame, socket }: RoundResultsViewProps): JSX.Element => {
  const round = game.round;
  const winner = game.getRoundWinner()
  const winningCard = game.round?.winningCard ? game.round?.winningCard : undefined;
  const player = game.getPlayer(socket.id)

  const startNextRound = () => {
    game.setView(socket.id, VIEWS.results.waitingForNextRound);
    setGame(game.clone());
    socket.emit(EVENTS.startNextRound, game);
  }

  const startNewGame = () => {
    game.setView(socket.id, VIEWS.results.waitingForNextGame);
    setGame(game.clone());
    socket.emit(EVENTS.startNewGame, game);
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
          />

        </div>
  
        <div style={{textAlign: "center", marginTop: 10}}>
          
          <ResultsTable game={game}/>

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
      </div>
    )
  } else {
    return (
      <div>Error</div>
    )
  }

}