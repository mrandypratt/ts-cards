import { SubmitButton } from "../components/Buttons/Submit";
import { PromptCard } from "../components/Cards/PromptCard";
import { ResponseCard } from "../components/Cards/ResponseCard";
import { PlayersHandStyle } from "../components/Containers/PlayersHand";
import { StatefulGame } from "../data/classes/StatefulGame";
import { ResponseCard as ResponseCardClass } from "../data/classes/ResponseCard"

type EnterPlayersViewProps = {
  game: StatefulGame;
  setGame: (game: StatefulGame) => void;
}

export const JudgeView = ({ game, setGame }: EnterPlayersViewProps): JSX.Element => {
  const round = game.round;

  if (round) {
    return (
      <div style={{ textAlign: "center" }}>
  
      <h2>Judge's Round</h2>
  
      <PromptCard text={round.promptCard.text} />
  
        <div style={PlayersHandStyle}>
  
          {round.players.map((player) => (
            <ResponseCard
              key={player.id}
              player={player}
              card={round.getSelection(player.name) || new ResponseCardClass("Error: JudgeView")}
              game={game}
              setGame={setGame}
            />
          ))}
  
        </div>
  
      <SubmitButton
        disabled={!round.isWinningCardSelected()}
        onClick={() => {
          game.setView(game.VIEWS.declareWinner);
          setGame(game.clone());
        }}
        text="Submit Card"
        type="button"
      />
    </div>
    )
  } else {
    return (
      <div>Error</div>
    )
  }
  }