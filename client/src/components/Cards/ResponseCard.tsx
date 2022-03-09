import { Card } from "../../data/classes/Card";
import { Player } from "../../data/classes/Player";
import { Game } from "../../data/classes/Game";
import { PlayingCard } from "./PlayingCard";
import { PlayerDataType } from "../../data/types/ClassTypes";
import { Socket } from "socket.io-client";
import { VIEWS } from "../../data/types/VIEWS";
import { EVENTS } from "../../data/constants/socketEvents";

type ResponseCardProps = {
  player: Player | PlayerDataType;
  card: Card;
  game: Game;
  setGame: (game: Game) => void;
  socket: Socket;
}

export const ResponseCard = ({ player, card, game, setGame, socket}: ResponseCardProps): JSX.Element => {

  if (game.currentPlayerView(player.socketId) === VIEWS.player.turn) {
    return (
      <PlayingCard 
        type={ game.round?.isCardSelected(player.name, card) ? "selected" : "response" }  
        text={ card.text } 
        onClick={ () => {
          game.round?.selectCard(player.name, card);
          socket.emit(EVENTS.updateServer)
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
