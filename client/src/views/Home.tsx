import { SubmitButton } from "../components/Buttons/Submit";
import { MESSAGES } from "../data/constants/messages"
import { ViewPropsType } from "../data/types/ViewPropsType";
import Container from '@mui/material/Container';
import { EVENTS } from "../data/constants/EVENTS";
import { VIEWS } from "../data/constants/VIEWS";

export const Home = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  
  const newGame = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.host.createLobby)
  }
  
  const joinLobby = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.guest.joinLobby)
  }
  
  const gettingStarted = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.gettingStarted)
  }

  return (
    <Container className="page-container" maxWidth="sm">   

      <h1><b>{MESSAGES.home.welcomeBanner}</b></h1>

      <hr></hr>

      <p>{MESSAGES.home.getStarted1}</p>

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

    </Container>
  )

}