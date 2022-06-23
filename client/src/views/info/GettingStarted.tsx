import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/types/VIEWS";

export const GettingStarted = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const returnHome = () => {
    game.setView(sessionId, VIEWS.home)
    setGame(game.clone());
  }

  return (
    <div style={{ textAlign: "center" }}>

      <h2>About the Game</h2>

      <p>{MESSAGES.gettingStarted.about}</p>

      <hr></hr>

      <h2>Creating Games</h2>

      <p>{MESSAGES.gettingStarted.creatingGames}</p>

      <hr></hr>

      <h2>Gameplay</h2>

      <p>{MESSAGES.gettingStarted.gameplay}</p>
      
      <hr></hr>

      <div onClick={returnHome} style={{marginTop: 10}}>
        <p style={{color: "blue", textDecoration: "underline", cursor: "pointer"}}>Back to Home</p>
      </div>

    </div>
  );
};
