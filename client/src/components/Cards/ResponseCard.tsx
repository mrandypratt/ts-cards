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
}

export const ResponseCard = ({ player, card, game, setGame}: ResponseCardProps): JSX.Element => {

  if (game.currentPlayerView(player.socketId) === VIEWS.player.turn) {
    return (
      <PlayingCard 
        type={ game.round?.isCardSelected(player.socketId, card) ? "selected" : "response" }  
        text={ card.text } 
        onClick={ () => {
          game.round?.selectCard(player.socketId, card);
          setGame(game.clone())
        }}
      />
    );
  }
  
  if (game.currentPlayerView(player.socketId) === VIEWS.judge.turn) {
    return (
      <PlayingCard 
        type={game.round?.isWinningCard(card) ? "selected" : "response"}
        text={ card.text } 
        onClick={ () => {
          if (game.round) {
            game.round?.setWinningCard(card);
            game.round?.setWinner(card);
          }
          setGame(game.clone());
        }}
      />
    );
  }
  
  if (game.currentPlayerView(player.socketId) === VIEWS.results.round ||
      game.currentPlayerView(player.socketId) === VIEWS.player.waitingForJudge) {
    return (
      <PlayingCard 
        type="response" 
        text={ card.text }
      />
    );
  }

  return (
    <div>Error :)</div>
  )
}
