import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { CSSProperties } from "react"

const cardStyles = {
  height: "100%",
  width: "100%",
  textAlign: "left",
  margin: "auto",
  fontFamily: "Helvetica",
  fontSize: "1rem",
  borderStyle: "solid",
  borderWidth: 1,
  borderRadius: 8,
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
}

export const PlayingCard = ({ type, className, style, onClick, text}: PlayingCardProps): JSX.Element =>  {
  return (
    <Grid className="playing-card">
      <Paper
        onClick={onClick}
        elevation={15}
        style={ Object.assign(styles[type], style) }
      >
        <p className="card-text">{text}</p>
      </Paper>
    </Grid>
  );
}
