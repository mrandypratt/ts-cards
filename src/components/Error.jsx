import Alert from '@mui/material/Alert'

export default function Error(props) {
  return (
    <Alert severity="error">
      <strong>Error: </strong>{ props.message }
    </Alert>
  );
}