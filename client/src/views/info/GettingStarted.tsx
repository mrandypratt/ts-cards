import { EVENTS } from "../../data/constants/EVENTS";
import { VIEWS } from "../../data/constants/VIEWS";
import { ViewPropsType } from "../../data/types/ViewPropsType";


export const HowToPlay = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const returnHome = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.home)
  }

  return (
    <div className="info-container" style={{ textAlign: "center" }}>
      <h1 style={{margin: "auto"}}>About the Game</h1>

      <hr></hr>

      <div style={{border: "1px solid black", maxWidth: "90%", marginLeft: "5%"}}>

        <h2 style={{paddingTop: "7px", margin: "auto"}}>Game Modes</h2>

        <hr></hr>

        <h3 style={{margin: "auto"}}>Multi-Player</h3>

        <p style={{marginTop: "5px"}}>Play with your friends. One friend will create the game first, then share the Lobby ID for the rest to join. Multi-player currently supports a minimum of 3 participants.</p>

        <h3 style={{margin: "auto"}}>Single-Player (Beta)</h3>

        <p style={{marginTop: "5px"}}>The single-player is set up to mock an online experience with randomly generated bot players. It is great to demonstrate the gameplay style, so maybe you'll invite friends :)</p>
      
      </div>

      <h2 style={{paddingTop: "8px", margin: "auto"}}>Gameplay</h2>

      <p style={{marginTop: "5px"}}>Winner is the first to 3 rounds. Currently, due to limited content, player hands are limited to 3 cards at a time. The rules are otherwise consistent with Cards Against Humanity. </p>
      
      <hr></hr>

      <h2 style={{margin: "auto"}}>Content & Development</h2>

      <p style={{marginTop: "5px"}}>{"All content was created by the devleoper, <APDev/>.  If you are interested in creating content or collaborating, please leave feedback with your email or follow the website link on the homepage footer."}</p>

      <div onClick={returnHome} style={{marginTop: 10}}>

        <p style={{color: "blue", textDecoration: "underline", cursor: "pointer"}}>Back to Home</p>
      
      </div>

    </div>
  );
};
