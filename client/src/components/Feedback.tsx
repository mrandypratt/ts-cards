import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { getServerURL } from "../data/functions/getURL";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LargeSuccessIcon } from "./Icons/SuccessIcon";

type FeedbackState = "button" | "form" | "loading" | "complete";

export const Feedback = (): JSX.Element => {
  const [ feedbackState, setFeedbackState ] = useState<FeedbackState>("button")

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
    setFeedbackState("loading");

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
      setFeedbackState("complete");
    }
  };

  if (feedbackState === "complete") {
    return (
      <div className="feedback-form">
        <div className="close-feedback-icon-container" onClick={() => setFeedbackState("button")}>
          <CloseRoundedIcon className="close-feedback-icon"/>
        </div>
        
        <div className="feedback-header-bg">
          <h1 className="feedback-header"><b>Provide Feedback</b></h1>
        </div>

        <h3 className="feedback-results-text">Your feedback has been submitted!</h3>

        <LargeSuccessIcon/>

        <p>{"Thank you so much for taking the time to help us improve :)"}</p>

        <button 
          className="close-feedback-complete" 
          onClick={() => setFeedbackState("button")}>
            Close
        </button>

        </div>
    )
  }

  if (feedbackState === "button") {
    return (
      <button
        className="feedback-button"
        onClick={() => setFeedbackState("form")}
      >Feedback?</button>
    )
  }

  if (feedbackState === "loading") {
    return (
      <div className="feedback-form">
        <div className="close-feedback-icon-container" onClick={() => setFeedbackState("button")}>
          <CloseRoundedIcon className="close-feedback-icon"/>
        </div>
        
        <div className="feedback-header-bg">
          <h1 className="feedback-header"><b>Provide Feedback</b></h1>
        </div>

        <h3 className="feedback-results-text">Submitting Feedback...</h3>
      </div>
    )
  }

  if (feedbackState === "form") {
    return (  
      <div className="feedback-form">  
  
        <div className="close-feedback-icon-container" onClick={() => setFeedbackState("button")}>
          <CloseRoundedIcon className="close-feedback-icon"/>
        </div>
  
        <div className="feedback-header-bg">
          <h1 className="feedback-header"><b>Provide Feedback</b></h1>
        </div>
  
        <p className="feedback-helper-text">Please let me know about your experience and any bugs, suggestions, criticism, or compliments.</p>
  
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
            rows={5}
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
            className="close-feedback" 
            onClick={() => setFeedbackState("button")}>
              Close
          </button>
  
          <button 
            className="submit-feedback"
            onClick={submitFeedback}>
              Submit
          </button>
  
        </div>
  
      </div>
    );
  }

  return (
    <h1>Error: Incorrect Feedback Data Type</h1>
  )

};