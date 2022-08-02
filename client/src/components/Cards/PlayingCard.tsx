import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { CSSProperties } from "react"
import { Player } from "../../data/classes/Player";

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
  type: "prompt" | "response" | "selected";
  style?: CSSProperties | undefined;
  onClick?: () => void;
  text: string;
  className: string;
  playerName?: string;
}

export const PlayingCard = ({ type, className, style, onClick, text, playerName}: PlayingCardProps): JSX.Element =>  {
  const fullClassName = "playing-card " + className;
  
  if (className !== "response-card-results") {
    return (
      <Grid>
        <Paper
          className={fullClassName}
          onClick={onClick}
          elevation={15}
          style={ Object.assign(styles[type], style) }
        >
          <p className="card-text">{text}</p>
        </Paper>
      </Grid>
    );
  }

  return (
    <Grid>
      <Paper
        className={fullClassName}
        onClick={onClick}
        elevation={15}
        style={ Object.assign(styles[type], style) }
      >
        <p className="card-text">{text}</p>
        <p className="card-text submitting-player-text">{playerName}'s Card</p>
      </Paper>
    </Grid>
  );
}
