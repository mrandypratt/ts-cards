import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { FaCrown } from 'react-icons/fa';

const cardStyles = {
  fontFamily: "Helvetica",
  fontSize: "1rem",
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: 10,
}

const responseStyles = {
  ...cardStyles,
  backgroundColor: "black",
  color: "white",
}

const promptStyles = {
  ...cardStyles,
  backgroundColor: "white"
}

const selectedStyles = {
  ...responseStyles,
  position: "relative",
  top: -40,
  borderColor: "yellow", 
  borderWidth: 7,
}

const styles = {
  response: responseStyles,
  prompt: promptStyles,
  selected: selectedStyles
};

type PlayingCardProps = {
  className: "response-card" | "solo-prompt-card" | "response-card-results" | "response-card-results winner" | "prompt-card-results";
  type: "prompt" | "response" | "selected";
  text: string;
  onClick?: () => void;
  playerName?: string;
}

export const PlayingCard = ({ className, type, text, onClick, playerName}: PlayingCardProps): JSX.Element =>  {

  return (
    <Grid>
      <Paper
        className={"playing-card " + className + (onClick ? " clickable" : "")}
        onClick={onClick}
        elevation={15}
        style={ Object.assign(styles[type]) }
      >
        <p className="card-text">{text}</p>
        
        { playerName && className === "response-card-results" && <p className="card-text submitting-player-text">
          {playerName}
        </p>}

        { playerName && className === "response-card-results winner" && <p className="card-text submitting-player-text">
          <FaCrown className="crown-icon"/> {playerName}
        </p>}
      </Paper>
    </Grid>
  );
}
