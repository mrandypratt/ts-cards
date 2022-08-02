import { PlayingCard } from './PlayingCard';

type PromptCardProps = {
  text: string;
  className: string;
}

export const PromptCard = ({ text, className }: PromptCardProps): JSX.Element => {
  return (
    <PlayingCard 
      type="prompt" 
      className={ className }
      text={ text }
    />
    )
  }