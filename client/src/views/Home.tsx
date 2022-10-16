import { SubmitButton, SubmitFeedbackButton, GettingStartedButton } from "../components/Buttons/Submit";
import { ViewPropsType } from "../data/types/ViewPropsType";
import Container from '@mui/material/Container';
import { EVENTS } from "../data/constants/EVENTS";
import { VIEWS } from "../data/constants/VIEWS";

const APDevIcon = require('../APDevLogo.png');

export const Home = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {

  const multiPlayer = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.multiPlayer.home)
  }
  
  const singlePlayer = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.home)
  }
  
  const gettingStarted = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.info.howToPlay)
  }

  const submitFeedback = () => {
    socket.emit(EVENTS.client.updateView, VIEWS.info.feedback)
  }

  return (
    <Container className="page-container" maxWidth="sm">   

      <h1><b>Cards with Friends</b></h1>

      <hr></hr>

      <p>It's Cards Against Humanity... on the internet.</p>
      
      <hr></hr>

      <p style={{marginTop: "2rem", fontSize: 20}}>So how do you want to play?</p>

      <div>
        
        <div>
          <SubmitButton 
            text={"Laugh with friends"}
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
          text={"How to Play"}
          onClick={gettingStarted}
          type="submit"
          disabled={false}
        />
      </div>

      <div>
        <SubmitFeedbackButton 
          text={"Submit Feedback"}
          onClick={submitFeedback}
          type="submit"
          disabled={false}
        />
      </div>



      <div className="footer">
        <p className="footer-text">Created by: </p>
        <a className="footer-links" href={"http://www.andyprattdev.com"} target="_blank" rel="noreferrer noopener" >
          <img src={APDevIcon} alt="Andy Pratt" className="footer-image"></img>
        </a>
      </div>

    </Container>
  )

}