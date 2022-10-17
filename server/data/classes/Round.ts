
import { CardDataType, RoundDataType } from "../../../client/src/data/types/ClassTypes";
import { shuffle } from "../../functions/shuffle";
import { Player } from "./Player";
import { PromptCard } from "./PromptCard";

type RoundPropsType = {
  number: number;
  players: Player[];
  judge: Player | null;
  promptCard: PromptCard | null;
}

export class Round {
  number: number;
  players: Player[];
  judge: Player | null;
  promptCard: PromptCard | null;
  winner: Player | null;

  constructor(roundData: RoundDataType | null, props?: RoundPropsType) {
        // May remove Player Data Reinstantiation after more Understanding of DataBase Calls
    if (roundData) {
      this.number = roundData.number;
      this.players = [];
      roundData.players.forEach(player => {
        this.players.push(new Player(player));
      });
      this.judge = new Player(roundData.judge);
      this.promptCard = new PromptCard(roundData.promptCard);
      this.winner = new Player(roundData.winner)
    } else if (props) {
      this.number = props.number;
      this.players = props.players;
      this.judge = props.judge;
      this.promptCard = props.promptCard;
      this.winner = null;
    } else {
      throw (Error("Issue Creating Round"))
    }
  }

  allSelectionsMade(): boolean {
    return this.players.every(player => player.selectedCard !== null);
  }

  randomizePlayerOrder(): void {
    this.players = shuffle(this.players)
  }

  setWinner(winningCard: CardDataType): void {
    // Remove from Players and add to winner
    this.players = this.players.filter(player => {
      if (player.selectedCard?.id === winningCard.id) {
        this.winner = player;
      }

      return player.selectedCard?.id !== winningCard.id;
    })
  }
}