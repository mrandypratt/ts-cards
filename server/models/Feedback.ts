import { Schema, model } from 'mongoose'

interface IFeedback {
  name: string;
  email: string;
  feedback: string;
}

const feedbackSchema = new Schema<IFeedback>({
  name: String,
  email: String,
  feedback: String,
}, {
  collection: 'Feedback'
});

const Feedback = model<IFeedback>('Feedback', feedbackSchema);
export default Feedback;