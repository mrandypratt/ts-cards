
import { PromptCard } from "./classes/PromptCard";
import { ResponseCard } from "./classes/ResponseCard";
import { allCardText} from "./allCardText";

type allCardsTextType = {
  prompts: {
      clean: string[];
      NSFW: string[];
  };
  responses: {
      clean: string[];
      NSFW: string[];
  };
}

class CardStore {
  allCardText: allCardsTextType;

  constructor() {
    this.allCardText = allCardText
  }

  dealCleanPromptCards(): PromptCard[] {
    return this.allCardText.prompts.clean.map(text => new PromptCard(null, text, true))
  }

  dealCleanResponseCards(): PromptCard[] {
    return this.allCardText.responses.clean.map(text => new ResponseCard(null, text, true))
  }

  dealNSFWPromptCards(): PromptCard[] {
    return this.allCardText.prompts.NSFW.map(text => new PromptCard(null, text, false))
  }

  dealNSFWResponseCards(): PromptCard[] {
    return this.allCardText.responses.NSFW.map(text => new ResponseCard(null, text, false))
  }

}

export const cardStore = new CardStore();