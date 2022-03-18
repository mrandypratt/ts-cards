import { PromptCard } from "../../components/Cards/PromptCard";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/types/VIEWS";

export const WaitingForNextGame = ({ game, setGame, socket }: ViewPropsType): JSX.Element => {
  const player = game.getPlayer(socket.id);

  return (
    <div style={{ textAlign: "center" }}>

      <h2>New Game | {player?.name}</h2>

      <hr></hr>

      <PromptCard text="Waiting for all players to join the next game..." />

      <hr></hr>

      <h3><b><u>Joined Lobby:</u></b></h3>

      {game.players.map(player => {
        return (
          <p key={player?.name}>{player?.name}: {player?.view === VIEWS.results.waitingForNextGame ? "Yes" : "No"}</p>
        )
      })}

    </div>
  );
} 