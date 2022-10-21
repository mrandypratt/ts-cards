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

const submitFeedbackStyles = {
  width: "40%",
  height: "100%",
  margin: 10,
  marginTop: 20,
  fontSize: "1em",
  borderWidth: "3px",
  maxWidth: 200,
  minWidth: 125,
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

export const SubmitButton = ({ text, type, onClick, disabled }: SubmitButtonProps): JSX.Element => {
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

export const ReturnHomeButton = ({ text, type, onClick, disabled }: SubmitButtonProps): JSX.Element => {
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

export const SubmitFeedbackButton = ({ text, type, onClick, disabled }: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      disabled={disabled}
      variant="outlined"
      type={type}
      style={ submitFeedbackStyles }
      color={'inherit'}
      onClick={onClick}
    >{ text }</Button>
  );
}

export const GettingStartedButton = ({ text, type, onClick, disabled }: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      disabled={disabled}
      variant="outlined"
      type={type}
      style={ gettingStartedStyles }
      color={'inherit'}
      onClick={onClick}
    >{ text }</Button>
  );
}

export const ExitLobbyButton = ({ text, type, onClick }: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      variant="outlined"
      type={type}
      style={ exitLobbyStyles }
      onClick={onClick}
      color="error"
    >{ text }</Button>
  );
}

export const ExitLobbyShadedButton = ({ text, type, onClick }: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      variant="outlined"
      type={type}
      style={ Object.assign({}, exitLobbyStyles, exitLobbyShadedStyles ) }
      onClick={onClick}
      color="error"
    >{ text }</Button>
  );
}