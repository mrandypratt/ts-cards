import { Card } from "../../data/classes/Card";
import { Player } from "../../data/classes/Player";
import { Game } from "../../data/classes/Game";
import { PlayingCard } from "./PlayingCard";
import { PlayerDataType } from "../../data/types/ClassTypes";
import { VIEWS } from "../../data/types/VIEWS";

type ResponseCardProps = {
  player: Player | PlayerDataType;
  card: Card;
  game: Game;
  setGame: (game: Game) => void;
  sessionId: string;
  className: string;
}

export const ResponseCard = ({ className, player, card, game, setGame, sessionId}: ResponseCardProps): JSX.Element => {

  if (game.getPlayerView(sessionId) === VIEWS.player.turn) {
    return (
      <div className="clickable">
        <PlayingCard 
          className={ className }
          type={ game.round?.isCardSelected(sessionId, card) ? "selected" : "response" }  
          text={ card.text } 
          onClick={ () => {
            if (game.round?.getSelection(sessionId)?.id === card.id) {
              game.round?.deselectCard(sessionId);
            } else {
              game.round?.selectCard(sessionId, card);
            }
            setGame(game.clone())
          }}
        />
      </div>
    );
  }
  
  if (game.getPlayerView(sessionId) === VIEWS.judge.turn) {
    return (
      <div className="clickable">
        <PlayingCard 
          className={ className }
          type={game.round?.isWinningCard(card) ? "selected" : "response"}
          text={ card.text } 
          onClick={ () => {
            if (game.round?.winningCard?.id === card.id) {
              game.round?.setWinningCard(null)
              game.round?.setWinner(null);
            } else {
              game.round?.setWinningCard(card);
              game.round?.setWinner(card);
            }
            setGame(game.clone());
          }}
        />
      </div>
    );
  }
  
  if (game.getPlayerView(sessionId) === VIEWS.results.round ||
      game.getPlayerView(sessionId) === VIEWS.player.waitingForJudge) {
    return (
      <div className="playing-card">
        <PlayingCard 
          className={ className }
          type="response" 
          text={ card.text }
        />
      </div>
    );
  }

  return (
    <div>Error: No Card</div>
  )
}
