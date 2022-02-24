import { Card } from "../../data/classes/Card";
import { Player } from "../../data/classes/Player";
import { StatefulGame } from "../../data/classes/StatefulGame";
import { PlayingCard } from "./PlayingCard";

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
        type={ game.round?.isCardSelected(player.name, card) ? "selected" : "response" }  
        text={ card.text } 
        onClick={ () => {
          game.round?.selectCard(player.name, card);
          setGame(game.clone());
        }}
      />
    );
  }
  
  // if (game.view === game.VIEWS.judge) {
  //   return (
  //     <PlayingCard 
  //       type={game.round?.isWinningCard(card) ? "selected" : "response"}
  //       text={ card.text } 
  //       onClick={ () => {
  //         if (game.round) {
  //           game.round?.setWinningCard(card);
  //           game.round?.setWinner(player);
  //         }
  //         setGame(game.clone());
  //       }}
  //     />
  //   );
  // }
  
  // if (game.view === game.VIEWS.declareWinner) {
  //   return (
  //     <PlayingCard 
  //       type="response" 
  //       text={ card.text }
  //     />
  //   );
  // }

  return (
    <div>Error :)</div>
  )
}
