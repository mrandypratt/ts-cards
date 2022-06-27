import { Button } from "@mui/material";

const buttonStyles = {
  width: "70%",
  height: 55,
  margin: 10,
  marginTop: 25,
  // float: "center",
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
  width: "40%%",
  height: 40,
  margin: 10,
  marginTop: 25,
  fontSize: 18,
  maxWidth: 200,
  backgroundColor: "black",
}

const exitLobbyStyles = {
  width: "40%%",
  height: 40,
  margin: 10,
  marginTop: 25,
  fontSize: 18,
  maxWidth: 200,
  backgroundColor: "black",
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
      style={ disabled ? styles.unclickable : styles.clickable }
      onClick={onClick}
    >{ text }</Button>
  );
}

export const ReturnHomeButton = ({ text, type, onClick, disabled }: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      type={type}
      style={ returnHomeStyles }
      onClick={onClick}
    >{ text }</Button>
  );
}

export const ExitLobbyButton = ({ text, type, onClick }: SubmitButtonProps): JSX.Element => {
  return (
    <Button
      variant="contained"
      type={type}
      style={ exitLobbyStyles }
      onClick={onClick}
    >{ text }</Button>
  );
}