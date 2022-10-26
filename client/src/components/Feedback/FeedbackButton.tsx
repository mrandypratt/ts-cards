interface FeedbackButtonProps {
  text?: string;
  onClick?: () => void;
}

export const FeedbackButton = ({ text, onClick }: FeedbackButtonProps): JSX.Element => {
  return (
    <button
      className="feedback-button"
      onClick={onClick}
    >{text || "Feedback"}</button>

  );
}