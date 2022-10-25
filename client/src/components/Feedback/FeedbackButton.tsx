import { Button } from "@mui/material";

const feedbackButtonStyles = {
  width: "40%",
  height: "100%",
  margin: 10,
  marginTop: 20,
  fontSize: "1em",
  borderWidth: "3px",
  maxWidth: 200,
  minWidth: 125,
}

interface FeedbackButtonProps {
  text: string;
  type: "submit" | "button";
  onClick: () => void;
}

export const FeedbackButton = ({ text, type, onClick }: FeedbackButtonProps): JSX.Element => {
  return (
    <Button
      disabled={false}
      variant="contained"
      type={type}
      style={ feedbackButtonStyles }
      color={'secondary'}
      onClick={onClick}
    >{ text }</Button>
  );
}