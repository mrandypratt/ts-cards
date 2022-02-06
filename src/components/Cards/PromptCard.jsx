import PlayingCard from './PlayingCard';

export default function PromptCard(props) {
  return (
    <PlayingCard 
      type="prompt" 
      text={ props.text } 
      style={ Object.assign({}, props.style) } 
    />
  )
}