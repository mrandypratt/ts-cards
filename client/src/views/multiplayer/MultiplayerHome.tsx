import { SubmitButton, GettingStartedButton, ReturnHomeButton } from "../../components/Buttons/Submit";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import Container from '@mui/material/Container';
import { EVENTS } from "../../data/constants/EVENTS";
import { VIEWS } from "../../data/constants/VIEWS";

export const MultiPlayerHome = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {

  const newGame = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.multiPlayer.host.createLobby)
  }
  
  const joinLobby = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.multiPlayer.guest.joinLobby)
  }

  const returnHome = () => {
    socket?.emit(EVENTS.client.updateView, VIEWS.home);
  }

  return (
    <Container className="page-container" maxWidth="sm">   

      <h1><b>Play with Friends</b></h1>

      <hr></hr>

      <p>Congrats on being popular!</p>

      <p>Start a game and invite friends or join an existing game if you've already been invited.</p>

      <div>
        
        <div>
          <SubmitButton 
            text={"New Game"}
            onClick={newGame}
            type="button"
            disabled={false}
          />
        </div>

        <div style={{marginBottom: 40}}>
          <SubmitButton 
            text={"Join Game"}
            onClick={joinLobby}
            type="button"
            disabled={false}
          />
        </div>

      </div> 

      <ReturnHomeButton
        text={"Return Home"}
        type={"submit"}
        disabled={false} 
        onClick={returnHome}
      />

    </Container>
  )

}