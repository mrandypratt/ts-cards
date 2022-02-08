import { PlayingCard } from './PlayingCard';

type PromptCardProps = {
  text: string;
}

export const PromptCard = ({ text }: PromptCardProps) => {
  return (
    <PlayingCard 
      type="prompt" 
      text={ text }
    />
  )
}