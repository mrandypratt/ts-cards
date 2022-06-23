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
}

export const ResponseCard = ({ player, card, game, setGame, sessionId}: ResponseCardProps): JSX.Element => {
  console.log(game.currentPlayerView(sessionId))
  if (game.currentPlayerView(sessionId) === VIEWS.player.turn) {
    return (
      <PlayingCard 
        type={ game.round?.isCardSelected(sessionId, card) ? "selected" : "response" }  
        text={ card.text } 
        onClick={ () => {
          game.round?.selectCard(sessionId, card);
          setGame(game.clone())
        }}
      />
    );
  }
  
  if (game.currentPlayerView(sessionId) === VIEWS.judge.turn) {
    console.log("ResponseCard.tsx Line 33")
    return (
      <PlayingCard 
        type={game.round?.isWinningCard(card) ? "selected" : "response"}
        text={ card.text } 
        onClick={ () => {
          console.log("Card Clicked")
          if (game.round) {
            game.round?.setWinningCard(card);
            game.round?.setWinner(card);
          }
          setGame(game.clone());
        }}
      />
    );
  }
  
  if (game.currentPlayerView(sessionId) === VIEWS.results.round ||
      game.currentPlayerView(sessionId) === VIEWS.player.waitingForJudge) {
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
