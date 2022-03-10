import { PromptCard } from "../../components/Cards/PromptCard";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { PlayersHandStyle } from "../../components/Containers/PlayersHand";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const PlayerWaitingForJudge = ({ game, setGame, socket }: ViewPropsType): JSX.Element => {
  const round = game.round;
  const player = game.getPlayer(socket.id);

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2>Round {game.rounds.length} | {player.name}</h2>

        <hr></hr>
  
        <h2>Judge's Round</h2>

        <h3>{game.getJudgePlayer()?.name} is selecting...</h3>
  
        <PromptCard text={round.promptCard.text} />
  
        <div style={PlayersHandStyle}>
  
          {round.playersSocketIds.map((socketId) => {
            let card = round.getSelection(socketId);

            if (card !== null) {
              return (
                <ResponseCard
                  key={card.id}
                  player={player}
                  card={card}
                  game={game}
                  setGame={setGame}
                />
                );
              } else {
                return (
                  <div>Error: JudgeTurn ResponseCard</div>
                )
              }
          })}
  
        </div>
  
      </div>
    );
  } else {
    return (
      <div>Error on JudgeTurn</div>
    )
  }
}