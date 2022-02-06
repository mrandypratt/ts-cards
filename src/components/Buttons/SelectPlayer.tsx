import { Button } from "@mui/material";
import { Player } from "../../data/classes/Player";

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

type SelectPlayerButtonProps = {
  player: Player;
  disabled: boolean;
  onClick: () => void;
}

export function SelectPlayerButton({ player, disabled, onClick}: SelectPlayerButtonProps) {
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