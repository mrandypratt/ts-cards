import PlayingCard from "./PlayingCard";

let unselectedStyles = {
  color: "white",
}

let selectedStyles = {
  color: "white",
  position: "relative",
  top: -40,
  borderColor: "yellow", 
  borderWidth: 7,
}

export default function ResponseCard({ player, card, game, setGame} ) {

  if (game.view === player.id) {
    let cardStyles = (game.round.isCardSelected(player, card)) ? selectedStyles : unselectedStyles;

    return (
      <PlayingCard 
        type="response" 
        text={ card.text } 
        style={ cardStyles } 
        onClick={ () => {
          game.round.selectCard(player, card);
          setGame(game.clone());
        }}
      />
    );
  }
  
  if (game.view === game.VIEWS.judge) {
    let cardStyles = (card === game.round.winningCard) ? selectedStyles : unselectedStyles;
    
    return (
      <PlayingCard 
        type="response" 
        text={ card.text } 
        style={ cardStyles } 
        onClick={ () => {
          game.round.winningCard = card;
          game.round.winner = player;
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
        style={unselectedStyles}
      />
    );
  }
}
