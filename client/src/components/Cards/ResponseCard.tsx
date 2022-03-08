import { Card } from "../../data/classes/Card";
import { Player } from "../../data/classes/Player";
import { Game } from "../../data/classes/Game";
import { PlayingCard } from "./PlayingCard";
import { PlayerDataType } from "../../data/types/ClassTypes";

type ResponseCardProps = {
  player: Player | PlayerDataType;
  card: Card;
  game: Game;
  setGame: (game: Game) => void;
}

export const ResponseCard = ({ player, card, game, setGame}: ResponseCardProps): JSX.Element => {

  if (game.currentPlayerView(player.socketId) === player.socketId) {
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
