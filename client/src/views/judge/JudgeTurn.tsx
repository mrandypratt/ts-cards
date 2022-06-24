import { SubmitButton } from "../../components/Buttons/Submit";
import { PromptCard } from "../../components/Cards/PromptCard";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { PlayersHandStyle } from "../../components/Containers/PlayersHand";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const JudgeTurn = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const round = game.round;
  const player = game.getPlayer(sessionId);

  console.log(`Current View: ${game.getPlayerView(sessionId)}`);
  console.log(game);
  console.log(`SessionID: ${sessionId}`);

  const selectWinner = (): void => {
    socket?.emit(EVENTS.winnerSelected, game);
  }

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2>Round {game.rounds.length + 1} | {player.name}</h2>

        <hr></hr>
  
        <h2>Judge's Turn</h2>

        <h2>Select the Winning Card</h2>
  
        <PromptCard text={round.promptCard.text} />
  
        <div style={PlayersHandStyle}>
  
          {round.playersSessionIds.map((playerSessionId) => {
            let card = round.getSelection(playerSessionId);

            if (card !== null) {
              return (
                <ResponseCard
                  key={card.id}
                  player={player}
                  card={card}
                  game={game}
                  setGame={setGame}
                  sessionId={sessionId}
                />
                );
              } else {
                return (
                  <div>Error: JudgeTurn ResponseCard</div>
                )
              }
          })}
  
        </div>
  
        <SubmitButton
          onClick={selectWinner}
          disabled={!round.isWinningCardSelected()}
          type="button"
          text="Submit Card"
        />
  
      </div>
    );
  } else {
    return (
      <div>Error on JudgeTurn</div>
    )
  }
}