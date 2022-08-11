import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GameDataType, PlayerDataType } from '../data/types/ClassTypes';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const ResultsTable = ({ game }: {game: GameDataType}): JSX.Element  => {
  return (
    <TableContainer sx={{ maxWidth: 300, textAlign: "center"}} component={Paper}>
      <Table sx={{ maxWidth: 350 }} size="small" aria-label="Scoreboard">
        <TableHead style={{backgroundColor: "black", color: "white"}}>
          <TableRow>
            <TableCell style={{color: "white"}}>Player</TableCell>
            <TableCell style={{color: "white"}} align="right">{game.winner ? "Final Score" : "Score"}</TableCell>
            {game.winner && 
              <TableCell className="winner-column" style={{color: "white", width: "0px", padding: "0px"}}></TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {game?.players.map((player: PlayerDataType) => (
            <TableRow
              key={player.sessionId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {player.name}
              </TableCell>

              <TableCell align="right">
                {player.wins}
              </TableCell>

              {game.winner && 
                <TableCell style={{width: "0px", padding: "0px"}}>
                  {game.winner.sessionId === player.sessionId && <EmojiEventsIcon className="winning-icon" />}
                </TableCell>
                } 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
