import { Button } from "@mui/material";

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
      variant="outlined"
      type={type}
      style={ submitFeedbackStyles }
      color={'inherit'}
      onClick={onClick}
    >{ text }</Button>
  );
}