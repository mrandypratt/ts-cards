import { SubmitButton } from "../components/Buttons/Submit";
import { PromptCard } from "../components/Cards/PromptCard";
import { ResponseCard } from "../components/Cards/ResponseCard";
import { PlayersHandStyle } from "../components/Containers/PlayersHand";
import { Player } from "../data/classes/Player";
import { Game } from "../data/classes/Game";

type PlayerViewProps = {
  player: Player;
  game: Game;
  setGame: (game: Game) => void;
}

export const PlayerView = ({ player, game, setGame }: PlayerViewProps): JSX.Element => {
  const round = game.round;

  if (round) {
    return (
      <div style={{ textAlign: "center" }}>
  
        <h2>{player.name}'s Turn</h2>
  
        <PromptCard text={round.promptCard.text} />
  
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
            // game.setView(game.VIEWS.selectPlayer)
            setGame(game.clone());
          }}
          disabled={!round.hasPlayerSelected(player.name)}
          type="button"
          text="Submit Card"
        />
  
      </div>
    );
  } else {
    return (
      <div>Error</div>
    )
  }
}