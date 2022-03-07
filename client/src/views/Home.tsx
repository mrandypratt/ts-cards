import { SubmitButton } from "../components/Buttons/Submit";
import { MESSAGES } from "../data/constants/messages"
import { ViewPropsType } from "../data/types/ViewPropsType";
import { VIEWS } from "../data/types/VIEWS";

export const Home = ({ game, setGame, socket }: ViewPropsType): JSX.Element => {
  
  const newGame = () => {
    game.setView(socket?.id, VIEWS.host.createLobby);
    setGame(game.clone());
  }
  
  const joinLobby = () => {
    game.setView(socket?.id, VIEWS.guest.joinLobby);
    setGame(game.clone());
  }
  
  const gettingStarted = () => {
    game.setView(socket?.id, VIEWS.gettingStarted);
    setGame(game.clone());
  }

  return (
    <div style={{ textAlign: "center" }}>

      <h1><b>{MESSAGES.home.welcomeBanner}</b></h1>

      <hr></hr>

      <p>{MESSAGES.home.getStarted1}</p>
      <p>{MESSAGES.home.getStarted2}</p>

      <div>
        
        <div>
          <SubmitButton 
            text={"New Game"}
            onClick={newGame}
            type="button"
            disabled={false}
          />
        </div>

        <div>
          <SubmitButton 
            text={"Join Lobby"}
            onClick={joinLobby}
            type="button"
            disabled={false}
          />
        </div>

      </div> 

      <div onClick={gettingStarted} style={{marginTop: 10}}>
        <p style={{color: "blue", textDecoration: "underline", cursor: "pointer"}}>Getting Started</p>
      </div>

    </div>
  )

}