import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../components/Buttons/ConfirmDeleteDialogue";
import { ExitLobbyButton, SubmitButton } from "../../components/Buttons/Submit";
import { PromptCard } from "../../components/Cards/PromptCard";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { PlayersHandStyle } from "../../components/Containers/PlayersHand";
import { MESSAGES } from "../../data/constants/messages";
import { EVENTS } from "../../data/constants/socketEvents";
import { ViewPropsType } from "../../data/types/ViewPropsType";
import { VIEWS } from "../../data/types/VIEWS";

export const PlayerTurn = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);
  
  const round = game.round;
  const player = game.getPlayer(sessionId);

  const submitSelection = (): void => {
    game.setView(sessionId, VIEWS.player.selectionMade);
    socket?.emit(EVENTS.playerSelection, game);
  }
  
  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>
        
        <h2 style={{margin: "auto"}}>Round {game.rounds.length + 1} - Submit Card</h2>

        <hr></hr>
        
        <h3 style={{margin: "auto"}}>{game.getJudgePlayer()?.name} is the Judge</h3>

        <hr></hr>
  
        <PromptCard text={round.promptCard.text} />
  
        <div style={PlayersHandStyle}>
  
          {player.cards.map((card) => {
            
            return (
              <ResponseCard
                key={card.id}
                player={player}
                card={card}
                game={game}
                setGame={setGame}
                sessionId={sessionId}
              />
            )
          })}
  
        </div>
  
        <SubmitButton
          onClick={submitSelection}
          disabled={!round.hasPlayerSelected(player.sessionId)}
          type="button"
          text="Submit Card"
          />

        <ExitLobbyButton
          text={"Quit Game"}
          type={"submit"}
          disabled={false} 
          onClick={showConfirmDeleteDialogue}
          />

          { showDialogue && 
            <ConfirmDeleteDialogue
              game={game}
              socket={socket}
              setShowDialogue={setShowDialogue}
              messages={[MESSAGES.dialogue.playerEndGame1, MESSAGES.dialogue.playerEndGame2]}
            />
          }
  
          { process.env.REACT_APP_STAGE === "dev" &&
            <p>Current Player: {player.name}</p>
          } 
      </div>
    );
  } else {
    return (
      <div>Error on PlayerTurn</div>
    )
  }
}