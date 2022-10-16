import { Box, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import { ReturnHomeButton, SubmitButton } from "../../components/Buttons/Submit";
import { EVENTS } from "../../data/constants/EVENTS";
import { VIEWS } from "../../data/constants/VIEWS";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const Feedback = ({game, setGame, socket, sessionId}: ViewPropsType): JSX.Element => {
  const [ isLoading, setIsLoading ] = useState(false);

  // Form Data State
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ feedback, setFeedback ] = useState("");

  const returnHome = () => {
    socket?.emit(EVENTS.client.updateView, VIEWS.home);
  }
  
  const updateName = (event: any) => {
    setName(event.target.value);
  }
  
  const updateEmail = (event: any) => {
    setEmail(event.target.value);
  }

  const updateFeedback = (event: any) => {
    setFeedback(event.target.value);
  }

  const submitFeedback = async () => {
    setIsLoading(true);

    console.log(process.env.REACT_APP_STAGE)

    const baseURL = process.env.REACT_APP_STAGE === "prod" ? "http://52.20.228.225:8787" : "http://localhost:8787";
    const APIURL = baseURL + "/api/feedback";

    console.log(APIURL)

    const feedbackData = {
      name: name,
      email: email,
      feedback: feedback,
    }

    console.log(JSON.stringify(feedbackData))


    try {
      const response = await fetch(APIURL, {
        method: 'POST',
        body: JSON.stringify(feedbackData),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result);

    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false);
      socket.emit(EVENTS.client.updateView, VIEWS.home);
    }
  };
    
  return (
    <Container className="page-container" maxWidth="sm">   

      <h1><b>Provide Feedback</b></h1>

      <hr></hr>

      { !isLoading &&
        <div>
          <p>We think we're great, but we could totally be better! </p>
          <p>Please help us by describing any issues with the game or suggestions what would make it more fun!</p>

          <Box style={{marginBottom: 10}}>
            <TextField 
              id="standard-basic"
              label="Name"
              variant="outlined"
              onChange={updateName}
            />
          </Box>

          <Box style={{marginBottom: 10}}>
            <TextField 
              id="standard-basic"
              label="Email"
              variant="outlined"
              onChange={updateEmail}
            />
          </Box>

          <Box style={{marginBottom: 10}}>
            <TextField 
              multiline={true}
              minRows={5}
              id="standard-basic"
              label="Feedback"
              variant="outlined"
              onChange={updateFeedback}
              fullWidth={true}
              helperText={"What can we improve? The more details the better :)"}
            />
          </Box>

          <div>
              <SubmitButton 
                text={"Submit Feedback"}
                onClick={submitFeedback}
                type="button"
                disabled={false}
              />
          </div>  
        </div>
      }

      { isLoading && 
        <h3>Submitting Feedback...</h3>
      }


      <ReturnHomeButton
        text={"Return Home"}
        type={"submit"}
        disabled={false} 
        onClick={returnHome}
      />

    </Container>
    
  );
};