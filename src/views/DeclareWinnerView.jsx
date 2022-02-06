import { SubmitButton } from "../components/Buttons/Submit";
import ResponseCard from "../components/Cards/ResponseCard";

export function DeclareWinnerView({ game, setGame }) {
  return (
    <div style={{ textAlign: "center" }}>

      <h1>{game.round.winner.name} is the Winner!</h1>

      <ResponseCard
        player={game.round.winner}
        card={game.round.winningCard}
        game={game}
        setGame={setGame}
      />

      <SubmitButton
        onClick={() => {
          game.round.removePlayedCards();
          game.createNewRound();
          game.setView(game.VIEWS.selectPlayer);
          setGame(game.clone())
        }}
        type="button"
        text="Play Again"
      />

    </div>
  )
}