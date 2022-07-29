import { PlayingCard } from './PlayingCard';

type PromptCardProps = {
  text: string;
}

export const PromptCard = ({ text }: PromptCardProps): JSX.Element => {
  return (
    <PlayingCard 
      type="prompt" 
      text={ text }
    />
  )
}