import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

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

const styles = {
  response: {
    ...cardStyles,
    backgroundColor: "black",
  },

  prompt: {
    ...cardStyles,
    backgroundColor: "white"
  },
};

type PlayingCardProps = {
  type: "prompt" | "response";
  style: React.CSSProperties | undefined;
  onClick: () => void;
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
