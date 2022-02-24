import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SubmitButton } from "../../components/Buttons/Submit";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const CreateLobby = ({game, setGame}: ViewPropsType): JSX.Element => {
  return (
    <div style={{ textAlign: "center" }}>

      <p>{MESSAGES.host.createLobby}</p>

      <Box>
        <TextField 
          id="standard-basic"
          label="Player Name"
          variant="standard"
        />
      </Box>

      <SubmitButton
        text={"Create Lobby"}
        type={"submit"}
        disabled={false} 
      />

    </div>
  );
};
