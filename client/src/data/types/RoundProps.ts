import { Player } from "../classes/Player";
import { PromptCard } from "../classes/PromptCard";

export type RoundProps = {
  players: Player[];
  judge: Player;
  promptCard: PromptCard;
}