
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const PlayerSelectionMade = ({ game, setGame, socket }: ViewPropsType): JSX.Element => {
  const round = game.round;
  const player = game.getPlayer(socket?.id);

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2>Round {game.rounds.length + 1} | {player.name}</h2>

        <hr></hr>
  
        <h2>{MESSAGES.player.responseSubmitted.success}</h2>
  
        <hr></hr>

        <p>Please wait...</p>

        <p>{MESSAGES.player.responseSubmitted.pleaseWait}</p>
  
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
      <div>Error on Player Selection Made</div>
    )
  }
}