import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/EVENTS";
import { VIEWS } from "../../data/constants/VIEWS";
import { ViewPropsType } from "../../data/types/ViewPropsType";


export const GettingStarted = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const returnHome = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.home)
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
