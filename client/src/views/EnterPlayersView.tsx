import { PlayerNameTextField } from "../components/Inputs/PlayerNameTextField";
import { SelectNumberOfPlayers } from "../components/Inputs/SelectNumberOfPlayers";
import { SubmitButton } from "../components/Buttons/Submit";
import { StatefulGame } from "../data/classes/StatefulGame";

type EnterPlayersViewProps = {
  game: StatefulGame;
  setGame: (game: StatefulGame) => void;
}

export const EnterPlayersView = ({ game, setGame }: EnterPlayersViewProps): JSX.Element => {

  const initializeGame = (event: any) => {
    event.preventDefault();
    // game.setView(game.VIEWS.selectPlayer);
    game.initializeGame();
    setGame(game.clone());
  }
  
  return (
    <div style={{ textAlign: "center" }}>
  
      <h1>Enter Players</h1>
  
      <form onSubmit={initializeGame}>
  
        <SelectNumberOfPlayers
          game={game}
          setGame={setGame}
        />
  
        {game.names.map((name: string, index: number): JSX.Element => {
          return (
            <PlayerNameTextField 
              key={index}
              nameIndex={index}
              game={game}
              setGame={setGame}
            />
          );
        })}
  
        <SubmitButton 
          disabled={!game.arePlayerNamesValid()}
          text="Submit Players"
          type="submit"
        />
  
      </form>
  
    </div>
  );
}