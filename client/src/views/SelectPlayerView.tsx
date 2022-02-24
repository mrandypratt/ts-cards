import { SelectPlayerButton } from "../components/Buttons/SelectPlayer";
import { SubmitButton } from "../components/Buttons/Submit";
import { PromptCard } from "../components/Cards/PromptCard";
import { StatefulGame } from "../data/classes/StatefulGame";

type SelectPlayerViewProps = {
  game: StatefulGame;
  setGame: (game: StatefulGame) => void;
}

export const SelectPlayerView = ({ game, setGame }: SelectPlayerViewProps): JSX.Element => {
  const round = game.round;

  if (round) {
    return (
      <div style={{ textAlign: "center" }}>

        <h1>Select Player</h1>

        <PromptCard text={round.promptCard.text} />
    
        <div style={{ padding: 10 }} />
    
        {round.players.map((player) => (
          <div key={player.id}>

            <SelectPlayerButton
              player={player}
              disabled={ round.hasPlayerSelected(player.name) }
              onClick={() => {
                game.setView(player.id);
                setGame(game.clone())
              }}
            />

          </div>
        ))}

        {round.allSelectionsMade() &&
          <SubmitButton
            onClick={() => {
              // game.setView(game.VIEWS.judge);
              setGame(game.clone());
            }}
            type="button"
            text="Judge's Round!"
            disabled={false}
          />
        }

      </div>
    );
  } else {
    return (
      <div>Error</div>
    )
  }
}