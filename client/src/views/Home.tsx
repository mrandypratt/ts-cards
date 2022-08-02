import { SubmitButton } from "../components/Buttons/Submit";
import { MESSAGES } from "../data/constants/messages"
import { ViewPropsType } from "../data/types/ViewPropsType";
import { VIEWS } from "../data/types/VIEWS";
import Container from '@mui/material/Container';

export const Home = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  
  const newGame = () => {
    game.setView(sessionId, VIEWS.host.createLobby);
    setGame(game.clone());
  }
  
  const joinLobby = () => {
    game.setView(sessionId, VIEWS.guest.joinLobby);
    setGame(game.clone());
  }
  
  const gettingStarted = () => {
    game.setView(sessionId, VIEWS.gettingStarted);
    setGame(game.clone());
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