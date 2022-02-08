import { Card } from "../../data/classes/Card";
import { Player } from "../../data/classes/Player";
import { StatefulGame } from "../../data/classes/StatefulGame";
import { PlayingCard } from "./PlayingCard";

const unselectedStyles = {};

const selectedStyles = {
  position: "relative",
  top: -40,
  borderColor: "yellow", 
  borderWidth: 7,
}

type ResponseCardProps = {
  player: Player;
  card: Card;
  game: StatefulGame;
  setGame: (game: StatefulGame) => void;
}

export const ResponseCard = ({ player, card, game, setGame}: ResponseCardProps): JSX.Element => {

  if (game.view === player.id) {
    return (
      <PlayingCard 
        type="response" 
        text={ card.text } 
        style={ game.round?.isCardSelected(player.name, card) ? selectedStyles : unselectedStyles } 
        onClick={ () => {
          game.round?.selectCard(player.name, card);
          setGame(game.clone());
        }}
      />
    );
  }
  
  if (game.view === game.VIEWS.judge) {
    return (
      <PlayingCard 
        type="response" 
        text={ card.text } 
        style={ card === game.round?.winningCard ? selectedStyles : unselectedStyles } 
        onClick={ () => {
          if (game.round) {
            game.round.winningCard = card;
            game.round.winner = player;
          }
          setGame(game.clone());
        }}
      />
    );
  }
  
  if (game.view === game.VIEWS.declareWinner) {
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
