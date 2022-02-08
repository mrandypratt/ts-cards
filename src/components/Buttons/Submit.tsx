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

type SubmitButtonProps = {
  text: string;
  type: "submit" | "button";
  onClick: () => void;
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