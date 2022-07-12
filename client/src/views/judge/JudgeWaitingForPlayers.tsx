import { ExitLobbyButton } from "../../components/Buttons/Submit";
import { PromptCard } from "../../components/Cards/PromptCard";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const JudgeWaitingForPlayers = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
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
  
        <h2>You are the Judge</h2>
  
        <PromptCard text={round.promptCard.text} />
  
        <hr></hr>

        <p>Please wait...</p>

        <p>{MESSAGES.judge.waiting}</p>
  
        <h3><b><u>Submissions:</u></b></h3>

        {round.playersSessionIds.map(playerSessionId => {
          let player = game.getPlayer(playerSessionId);
          return (
            <p key={player?.name}>{player?.name}: {round.hasPlayerSelected(playerSessionId) ? "Yes" : "No"}</p>
          )
        })}

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
      <div>Error on JudgeWaitingForPlayers</div>
    )
  }
}