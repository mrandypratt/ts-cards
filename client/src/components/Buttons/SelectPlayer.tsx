import { Button } from "@mui/material";
import { Player } from "../../data/classes/Player";

const buttonStyles = {
  width: "60%",
  height: 40,
  margin: 10,
  maxWidth: 300,
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

type SelectPlayerButtonProps = {
  player: Player;
  disabled: boolean;
  onClick: () => void;
}

export const SelectPlayerButton = ({ player, disabled, onClick}: SelectPlayerButtonProps): JSX.Element => {

  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={ onClick }
      style={ disabled ? styles.unclickable : styles.clickable }
      key={ player.name }
    >{ player.name }</Button>
  );
}