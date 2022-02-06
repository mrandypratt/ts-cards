import { SubmitButton } from "../components/Buttons/Submit";
import PromptCard from "../components/Cards/PromptCard";
import ResponseCard from "../components/Cards/ResponseCard";
import { PlayersHandStyle } from "../components/Containers/PlayersHand";

export function PlayerView({ player, game, setGame }) {
  
  return (
    <div style={{ textAlign: "center" }}>

      <h2>{player.name}'s Turn</h2>

      <PromptCard text={game.round.promptCard.text} />

      <div style={PlayersHandStyle}>

        {player.cards.map((card) => (

          <ResponseCard
            key={card.id}
            player={player}
            card={card}
            game={game}
            setGame={setGame}
          />
        ))}

      </div>

      <SubmitButton
        onClick={() => {
          game.setView(game.VIEWS.selectPlayer)
          setGame(game.clone());
        }}
        disabled={!game.round.hasPlayerSelected(player)}
        type="button"
        text="Submit Card"
      />

    </div>
  );
}