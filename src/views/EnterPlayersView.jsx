import PlayerNameTextField from "../components/Inputs/PlayerNameTextField";
import SelectNumberOfPlayers from "../components/Inputs/SelectNumberOfPlayers";
import { SubmitButton } from "../components/Buttons/Submit";

export function EnterPlayersView({ game, setGame }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    game.setView(game.VIEWS.selectPlayer);
    game.initializeGame();
    setGame(game.clone());
  }
  
  return (
    <div style={{ textAlign: "center" }}>
  
      <h1>Enter Players</h1>
  
      <form onSubmit={handleSubmit}>
  
        <SelectNumberOfPlayers
          game={game}
          setGame={setGame}
        />
  
        {game.names.map((name, index) => {
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
          disabled={!game.arePlayerNamesValid(game.names)}
          text="Submit Players"
          type="submit"  
        />
  
      </form>
  
    </div>
  );
}