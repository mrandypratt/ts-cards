import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { CSSProperties } from "react"

const cardStyles = {
  height: 200,
  width: 143,
  textAlign: "left",
  padding: 20,
  margin: "auto",
  paddingBottom: 30,
  fontFamily: "Helvetica",
  fontSize: 18,
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
}

export const PlayingCard = ({ type, style, onClick, text}: PlayingCardProps): JSX.Element =>  {
  return (
    <Grid>
      <Paper
        onClick={onClick}
        elevation={15}
        style={ Object.assign(styles[type], style) }
      >
        {text}
      </Paper>
    </Grid>
  );
}
