import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Player } from '../data/classes/Player';
import { ViewPropsType } from "../data/types/ViewPropsType"

export const ResultsTable = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element  => {
  return (
    <TableContainer sx={{ maxWidth: 300, textAlign: "center"}} component={Paper}>
      <Table sx={{ maxWidth: 350 }} size="small" aria-label="Scoreboard">
        <TableHead style={{backgroundColor: "black", color: "white"}}>
          <TableRow>
            <TableCell style={{color: "white"}}>Player</TableCell>
            <TableCell style={{color: "white"}} align="center">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {game.players.map((player: Player) => (
            <TableRow
              key={player.sessionId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {player.name}
              </TableCell>
              <TableCell align="center">{game.getScore(player.sessionId)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
