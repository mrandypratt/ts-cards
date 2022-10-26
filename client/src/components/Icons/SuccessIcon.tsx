import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';

export const SuccessIcon = (): JSX.Element => {
  return (
    <CheckCircleSharpIcon style={{color: "green", verticalAlign: "bottom"}}/>
  )
}

export const LargeSuccessIcon = (): JSX.Element => {
  return (
    <CheckCircleSharpIcon fontSize="large" style={{color: "green", verticalAlign: "bottom"}}/>
  )
}