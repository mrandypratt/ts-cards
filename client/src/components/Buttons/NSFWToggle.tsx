import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Game } from '../../data/classes/Game';
import { FormHelperText } from '@mui/material';


const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'red',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "black",
    boxSizing: 'border-box',
  },
}));

export default function NSFWToggle({game, setGame}: {game: Game, setGame: (game: Game) => void}): JSX.Element {
  const toggleNSFW = () => {
    game.toggleNSFW()
    setGame(game);
  }
  
  return (
    <div id="nsfw-toggle">
      <FormHelperText style={{textAlign: "left"}}>Toggle Deck Selection</FormHelperText>
      <Stack id={"ThisStack"} direction="row" spacing={1} display={"flex"} flexDirection="row" alignItems="center" justifyContent="center">
        <Typography style={{color: "black", padding: 0, fontSize: "1.2rem"}}>Clean</Typography>
          <AntSwitch onClick={(toggleNSFW)} inputProps={{ 'aria-label': 'ant design' }} />
        <Typography style={{color: "red", padding: 0, fontSize: "1.2rem"}}>NSFW</Typography>
      </Stack>
    </div>
  );
}
