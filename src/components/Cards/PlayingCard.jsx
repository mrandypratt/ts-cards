import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Error from "../Error";

const CARDCOLOR = {
  prompt: "white",
  response: "black",
};

function defaultStyles(color) {
  return {
    height: 200,
    width: 143,
    textAlign: "left",
    padding: 20,
    margin: "auto",
    paddingBottom: 30,
    backgroundColor: color,
    fontFamily: "Helvetica",
    fontSize: 18,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
  };
}

export default function PlayingCard(props) {
  const ELEVATION = 15;
  let cardColor = CARDCOLOR[props.type];
  let allCardStyles = Object.assign({}, defaultStyles(cardColor), props.style);

  if (!cardColor) {
    return (
      <Error message='PlayingCard type must be either "prompt" or "response".' />
    );
  } else
    return (
      <Grid>
        <Paper
          onClick={props.onClick}
          elevation={ELEVATION}
          style={allCardStyles}
        >
          {props.text}
        </Paper>
      </Grid>
    );
}
