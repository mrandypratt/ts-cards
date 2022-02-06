import { PromptCard } from "../classes/PromptCard";

export const prompts = [
  "I'm not usually into ______, but I would be if the money was right.",
  "This country would be so much better if it weren't for ______.",
  "Please don't stop! I love ______.",
  "The best people are passionate about ______.",
  "I can't believe that ______ is still acceptable!",
  "History repeats itself. That's why it's obvious that ______ is coming back.",
  "Sorry, for spacing out. I was distracted by thoughts of ______.",
  "It's time to grow up and stop ______.",
  "When feeling stressed, just try ______.",
  "Although it is hard to prove mathematically, ______ will truly change the world.",
  "FBI, open up!  You're under arrest for ______.",
  "______ in the morning is the best way to start the day.",
  "If you aren't ______, are you even living?",
];

prompts.forEach((prompt) => {
  new PromptCard(prompt);
})

export const promptCards = PromptCard.shufflePromptCards();