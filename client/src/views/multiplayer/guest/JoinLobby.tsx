import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { SubmitButton, ReturnHomeButton } from "../../../components/Buttons/Submit";
import { EVENTS } from "../../../data/constants/EVENTS";
import { containsValidCharacters } from "../../../data/functions/arePlayerNamesValid";
import { ViewPropsType } from "../../../data/types/ViewPropsType";
import Alert from '@mui/material/Alert';
import { VIEWS } from "../../../data/constants/VIEWS";


export const JoinLobby = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [ lobbyId, setLobbyId ] = useState("");
  const [ name, setName ] = useState("");
  const [ alertMessage, setAlertMessage] = useState<string | null>(null)


  const updateLobbyId = (event: any) => {
    setLobbyId(event.target.value);
  }

  const updateName = (event: any) => {
    setName(event.target.value);
  }
  
  const joinLobby = () => {
    socket?.emit(EVENTS.client.multiPlayer.joinLobby, lobbyId, name);
  }
  
  const returnHome = () => {
    socket?.emit(EVENTS.client.updateView, VIEWS.home);
  }

  useEffect(() => {
    socket.on(EVENTS.server.invalidLobbyId, (lobbyId: string) => {
      setAlertMessage(`${lobbyId} is not a valid Lobby Id`);

      setTimeout(() => {
        setAlertMessage(null);
      }, 5000)
    })
  }, [socket])

  return (
    <Container className="page-container" maxWidth="sm">   
    
    { alertMessage && 
      <Alert severity="error">{alertMessage}</Alert>
    }

    <h1><b>Join Game</b></h1>

    <hr></hr>

      <p>Enter the <b>Lobby ID</b> provided by the game host.</p>

      <Box style={{marginBottom: 10}}>
        <TextField 
          id="standard-basic"
          label="Lobby ID"
          variant="outlined"
          helperText="Enter Lobby ID"
          onChange={updateLobbyId}
        />
      </Box>

      <Box>
        <TextField 
          id="standard-basic"
          label="Name"
          variant="outlined"
          helperText="Enter your name"
          onChange={updateName}
        />
      </Box>

      <SubmitButton
        text={"Join Game"}
        type={"submit"}
        disabled={!containsValidCharacters([name])} 
        onClick={joinLobby}
      />

      <ReturnHomeButton
        text={"Return Home"}
        type={"submit"}
        disabled={false} 
        onClick={returnHome}
      />

    </Container>
  );
};
