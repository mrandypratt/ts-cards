import { Button } from "@mui/material";

let unclickableButtonStyles = {
  backgroundColor: "grey",
  width: "70%",
  height: 55,
  margin: 10,
  marginTop: 25,
  float: "center",
  fontSize: 18,
  maxWidth: 400
}

let clickableButtonStyles = {
  backgroundColor: "black",
  width: "70%",
  height: 55,
  margin: 10,
  marginTop: 25,
  float: "center",
  fontSize: 18,
  maxWidth: 400
}

export function SubmitButton({ text, type, onClick, disabled}) {
  let buttonStyles = disabled ? unclickableButtonStyles : clickableButtonStyles;

  return (
    <Button
      disabled={disabled}
      variant="contained"
      type={type}
      style={ buttonStyles }
      onClick={onClick}
    >{ text }</Button>
  );
}