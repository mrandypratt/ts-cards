import { Button } from "@mui/material";

let buttonStyles = {
  width: "60%",
  height: 40,
  margin: 10,
  maxWidth: 300,
}

let clickableButtonStyles = {
  backgroundColor: "black",
}

let unclickableButtonStyles = {
  backgroundColor: "gray",
}

export function SelectPlayerButton({ player, disabled, onClick}) {
  let clickStyle = disabled ? unclickableButtonStyles : clickableButtonStyles;

  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={ onClick }
      style={ Object.assign({}, buttonStyles, clickStyle) }
      key={ player.id }
    >{ player.name }</Button>
  );
}