import { Box, TextField } from "@mui/material";
import { useState } from "react";
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
      <div className="feedback-form">Complete! Thanks for providing your Feedback</div>
    )
  }

    
  return (  
    <div className="feedback-form">   

      <h1 className="feedback-header"><b>Provide Feedback</b></h1>

      { !isLoading &&
        <div>
          <div className="feedback-header-bg"></div>
          <p className="feedback-helper-text">Please tell me about bug-fixes, improvements, criticism, or compliments.</p>

          <Box style={{marginBottom: 7.5, marginTop: 10}}>
            <TextField 
              size="small"
              id="standard-basic"
              label="Name"
              variant="outlined"
              onChange={updateName}
            />
          </Box>

          <Box style={{marginBottom: 7.5}}>
            <TextField 
              size="small"
              id="standard-basic"
              label="Email"
              variant="outlined"
              onChange={updateEmail}
            />
          </Box>

          <Box style={{marginBottom: 5}}>
            <TextField 
              multiline={true}
              minRows={5}
              id="standard-basic"
              label="Feedback"
              variant="outlined"
              onChange={updateFeedback}
              fullWidth={true}
              size="small"
            />
          </Box>

          <div className="feedback-button-container">

            <button 
              className="submit-feedback"
              onClick={submitFeedback}>
                Submit
            </button>

            <button 
              className="close-feedback" 
              onClick={hideFeedbackForm}>
                Close
            </button>
          </div>

        </div>
      }

      { isLoading && 
        <h3>Submitting Feedback...</h3>
      }
        
    </div>
  );
};