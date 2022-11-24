import { SubmitButton, GettingStartedButton } from "../components/Buttons/Submit";
import { ViewPropsType } from "../data/types/ViewPropsType";
import Container from '@mui/material/Container';
import { EVENTS } from "../data/constants/EVENTS";
import { VIEWS } from "../data/constants/VIEWS";
import { APDevFooter } from "../components/Footer/Footer";

export const Home = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {

  const multiPlayer = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.multiPlayer.home)
  }
  
  const singlePlayer = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.singlePlayer.createGame)
  }
  
  const gettingStarted = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.info.howToPlay)
  }

  return (
    <Container className="page-container" maxWidth="sm">   

      <h1><b>Cards with Friends</b></h1>

      <hr></hr>

      <p>It's Cards Against Humanity... on the internet.</p>
      
      <hr></hr>

      <p style={{marginTop: "2rem", fontSize: 20}}>Who do you want to play?</p>

      <div>
        
        <div>
          <SubmitButton 
            text={"Laugh with Friends"}
            onClick={multiPlayer}
            type="button"
            disabled={false}
          />
        </div>

        <div>
          <SubmitButton 
            text={"Play with Myself"}
            onClick={singlePlayer}
            type="button"
            disabled={false}
          />
        </div>

      </div> 

      <div>
        <GettingStartedButton 
          text={"About CWF"}
          onClick={gettingStarted}
          type="submit"
          disabled={false}
        />
      </div>

      <APDevFooter/>

    </Container>
  )

}