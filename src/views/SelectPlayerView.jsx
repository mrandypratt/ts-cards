import { SelectPlayerButton } from "../components/Buttons/SelectPlayer";
import { SubmitButton } from "../components/Buttons/Submit";
import PromptCard from "../components/Cards/PromptCard";

export function SelectPlayerView({ game, setGame }) {

  return (
    <div style={{ textAlign: "center" }}>

      <h1>Select Player</h1>

      <PromptCard text={game.round.promptCard.text} />
  
      <div style={{ padding: 10 }} />
  
      {game.round.players.map((player) => (
        <div key={player.id}>

          <SelectPlayerButton
            player={player}
            disabled={ game.round.hasPlayerSelected(player) }
            onClick={() => {
              game.setView(player.id);
              setGame(game.clone())
            }}
          />

        </div>
      ))}

      {game.round.allSelectionsMade() &&
        <SubmitButton
          onClick={() => {
            game.setView(game.VIEWS.judge);
            setGame(game.clone());
          }}
          type="button"
          text="Judge's Round!"
        />
      }

    </div>
  );
}