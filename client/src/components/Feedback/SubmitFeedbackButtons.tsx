import { Button } from "@mui/material";

const buttonStyles = {
  width: "70%",
  height: 55,
  margin: 10,
  marginTop: 25,
  fontSize: 18,
  maxWidth: 400
}

const styles = {
  clickable: {
    ...buttonStyles,
    backgroundColor: "black",
  },

  unclickable: {
    ...buttonStyles,
    backgroundColor: "gray"
  },
};

const returnHomeStyles = {
  margin: "auto",
  width: "40%%",
  height: 40,
  marginTop: 20,
  fontSize: 18,
  maxWidth: 200,
  display: 'block',
}

const gettingStartedStyles = {
  width: "40%",
  height: "100%",
  margin: 10,
  marginTop: 40,
  fontSize: "1em",
  borderWidth: "3px",
  maxWidth: 200,
  minWidth: 125,
}

const exitLobbyStyles = {
  width: "40%%",
  height: 40,
  margin: 10,
  marginTop: 25,
  fontSize: 18,
  maxWidth: 200,
  color: "red",
  backgroundColor: "white",
  border: "solid 1px",
  zIndex: 3,
}

const exitLobbyShadedStyles = {
  backgroundColor: "#969393",
}

type SubmitButtonProps = {
  text: string;
  type: "submit" | "button";
  onClick?: () => void;
  disabled: boolean;
}

export const SubmitFeedbackButton = ({ text, type, onClick, disabled }: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      type={type}
      color={'warning'}
      style={ disabled ? styles.unclickable : styles.clickable }
      onClick={onClick}
    >{ text }</Button>
  );
}

export const HideFeedbackFormButton = ({ text, type, onClick, disabled }: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      disabled={disabled}
      variant="outlined"
      type={type}
      style={ returnHomeStyles }
      color={'info'}
      onClick={onClick}
    >{ text }</Button>
  );
}