import { PromptCard } from "../../components/Cards/PromptCard";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/types/VIEWS";

export const WaitingForNextRound = ({ game, setGame, socket }: ViewPropsType): JSX.Element => {
  const player = game.getPlayer(socket.id);

  return (
    <div style={{ textAlign: "center" }}>

      <h2>Round {game.rounds.length + 1} | {player?.name}</h2>

      <hr></hr>

      <PromptCard text="Waiting for all players to move to next round..." />

      <hr></hr>

      <h3><b><u>Joined Lobby:</u></b></h3>

      {game.players.map(player => {
        return (
          <p key={player?.name}>{player?.name}: {player?.view === VIEWS.results.waitingForNextRound ? "Yes" : "No"}</p>
        )
      })}

    </div>
  );
} 