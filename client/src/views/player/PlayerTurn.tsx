import { SubmitButton } from "../../components/Buttons/Submit";
import { PromptCard } from "../../components/Cards/PromptCard";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { PlayersHandStyle } from "../../components/Containers/PlayersHand";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/types/VIEWS";

export const PlayerTurn = ({ game, setGame, socket }: ViewPropsType): JSX.Element => {
  const round = game.round;
  const player = game.getPlayer(socket.id);

  const submitSelection = (): void => {
    game.setView(socket?.id, VIEWS.player.selectionMade);
    socket?.emit(EVENTS.playerSelection, game);
  }

  console.log(game);
  
  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2>Round {game.rounds.length} | {player.name}</h2>

        <hr></hr>
  
        <h2>Select a Card</h2>
  
        <PromptCard text={round.promptCard.text} />
  
        <div style={PlayersHandStyle}>
  
          {player.cards.map((card) => {
  
            return (
              <ResponseCard
                key={card.id}
                player={player}
                card={card}
                game={game}
                setGame={setGame}
              />
            )
          })}
  
        </div>
  
        <SubmitButton
          onClick={submitSelection}
          disabled={!round.hasPlayerSelected(player.socketId)}
          type="button"
          text="Submit Card"
        />
  
      </div>
    );
  } else {
    return (
      <div>Error on PlayerTurn</div>
    )
  }
}