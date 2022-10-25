import { Box, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { useState } from "react";
import { SubmitButton } from "../Buttons/Submit";
import { getServerURL } from "../../data/functions/getURL";

type FeedbackFormPropsType = {
  setShowFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>
}

export const FeedbackForm = ({setShowFeedbackForm}: FeedbackFormPropsType): JSX.Element => {
  const [ isComplete, setIsComplete ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const hideFeedbackForm = () => {
    setShowFeedbackForm(false);
  }

  // Form Data State
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ feedback, setFeedback ] = useState("");
  
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

    const baseURL = getServerURL();
    const APIURL = baseURL + "/api/feedback";

    const feedbackData = {
      name: name,
      email: email,
      feedback: feedback,
    }

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
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <div>Complete! Thanks for providing your Feedback</div>
    )
  }

    
  return (
    <Container className="feedback-form" maxWidth="sm">   
    
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
        
      </Container>
  );
};