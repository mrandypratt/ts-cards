import { ExitLobbyButton } from "../../components/Buttons/Submit";
import { PromptCard } from "../../components/Cards/PromptCard";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { PlayersHandStyle } from "../../components/Containers/PlayersHand";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const PlayerWaitingForJudge = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const round = game.round;
  const player = game.getPlayer(sessionId);

  const quitGame = () => {
    socket.emit(EVENTS.deleteLobby, game);
  }

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2>Round {game.rounds.length + 1} | {player.name}</h2>

        <hr></hr>
  
        <h2>Judge's Round</h2>

        <h3>{game.getJudgePlayer()?.name} is selecting...</h3>
  
        <PromptCard text={round.promptCard.text} />
  
        <div style={PlayersHandStyle}>
  
          {round.playersSessionIds.map((sessionId) => {
            let card = round.getSelection(sessionId);

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

        <ExitLobbyButton
          text={"Quit Game"}
          type={"submit"}
          disabled={false} 
          onClick={quitGame}
        />
  
      </div>
    );
  } else {
    return (
      <div>Error on JudgeTurn</div>
    )
  }
}