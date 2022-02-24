import { SubmitButton } from "../components/Buttons/Submit";
import { ResponseCard } from "../components/Cards/ResponseCard";
import { Round } from "../data/classes/Round";
import { StatefulGame } from "../data/classes/StatefulGame";

type DeclareWinnerViewProps = {
  game: StatefulGame;
  setGame: (game: StatefulGame) => void;
}

export const DeclareWinnerView = ({ game, setGame }: DeclareWinnerViewProps): JSX.Element => {
  const round = game.round;

  const resetGame = (round: Round, game: StatefulGame) => {
    round.removePlayedCards();
    game.createNewRound();
    // game.setView(game.VIEWS.selectPlayer);
    setGame(game.clone())
  }

  if (round && round.winner && round.winningCard) {
    return (
      <div style={{ textAlign: "center" }}>
  
        <h1>{round.winner.name } is the Winner!</h1>
  
        <ResponseCard
          player={round.winner || null}
          card={round.winningCard}
          game={game}
          setGame={setGame}
        />
  
        <SubmitButton
          onClick={() => resetGame(round, game)}
          type="button"
          text="Play Again"
          disabled={false}
        />
  
      </div>
    )
  } else {
    return (
      <div>Error</div>
    )
  }

}