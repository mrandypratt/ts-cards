import { SubmitButton } from "../components/Buttons/Submit";
import PromptCard from "../components/Cards/PromptCard";
import ResponseCard from "../components/Cards/ResponseCard";
import { PlayersHandStyle } from "../components/Containers/PlayersHand";

export function JudgeView({ game, setGame }) {

  return (
    <div style={{ textAlign: "center" }}>

    <h2>Judge's Round</h2>

    <PromptCard text={game.round.promptCard.text} />

      <div style={PlayersHandStyle}>

        {game.round.players.map((player) => (
          <ResponseCard
            key={player.id}
            player={player}
            card={game.round.getSelection(player)}
            game={game}
            setGame={setGame}
          />
        ))}

      </div>

    <SubmitButton
      disabled={!game.round.isWinner()}
      onClick={() => {
        game.setView(game.VIEWS.declareWinner);
        setGame(game.clone());
      }}
      text="Submit Card"
      type="button"
    />
  </div>
  )
}