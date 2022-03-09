import { PromptCard } from "../../components/Cards/PromptCard";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const JudgeWaitingForPlayers = ({ game, setGame, socket }: ViewPropsType): JSX.Element => {
  const round = game.round;
  const player = game.getPlayer(socket?.id);

  console.log(game);

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2>Round {game.rounds.length}</h2>
  
        <h2>You are the Judge</h2>
  
        <PromptCard text={round.promptCard.text} />
  
        <hr></hr>

        <p>Please wait...</p>

        <p>{MESSAGES.judge.waiting}</p>
  
        <h3><b><u>Submissions:</u></b></h3>

        {round.playersSocketIds.map(playerSocketId => {
          let player = game.getPlayer(playerSocketId);
          return (
            <p key={player?.name}>{player?.name}: {round.hasPlayerSelected(playerSocketId) ? "Yes" : "No"}</p>
          )
        })}

      </div>
    );
  } else {
    return (
      <div>Error</div>
    )
  }
}