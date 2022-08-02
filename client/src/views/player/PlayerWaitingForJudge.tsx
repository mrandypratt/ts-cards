import { useState } from "react";
import { ConfirmDeleteDialogue } from "../../components/Buttons/ConfirmDeleteDialogue";
import { ExitLobbyShadedButton } from "../../components/Buttons/Submit";
import { PromptCard } from "../../components/Cards/PromptCard";
import { ResponseCard } from "../../components/Cards/ResponseCard";
import { PlayersHandStyle } from "../../components/Containers/PlayersHand";
import { MESSAGES } from "../../data/constants/messages";
import { ViewPropsType } from "../../data/types/ViewPropsType";

export const PlayerWaitingForJudge = ({ game, setGame, socket, sessionId }: ViewPropsType): JSX.Element => {
  const [showDialogue, setShowDialogue] = useState(false);
  
  const round = game.round;
  const player = game.getPlayer(sessionId);

  const showConfirmDeleteDialogue = () => {
    setShowDialogue(true);
  }

  if (round && player) {
    return (
      <div style={{ textAlign: "center" }}>

        <h2 style={{margin: "auto"}}>Round {game.rounds.length + 1}</h2>
        
        <hr></hr>
  
        <h3 style={{margin: "auto"}}>Judge's Turn</h3>

        <hr></hr>

        <h2>{game.getJudgePlayer()?.name} is selecting...</h2>
  
        <PromptCard text={round.promptCard.text} />
  
        <div style={PlayersHandStyle}>
  
          {round.playersSessionIds.map((sessionId) => {
            let card = round.getSelection(sessionId);

            if (card !== null) {
              return (
                <ResponseCard
                  key={card.id}
                  player={player}
                  card={card}
                  game={game}
                  setGame={setGame}
                  sessionId={sessionId}
                />
                );
              } else {
                return (
                  <div>Error: JudgeTurn ResponseCard</div>
                )
              }
          })}
  
        </div>

        <ExitLobbyShadedButton
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

      <div 
        className="no-action-bg">
      </div>

        { process.env.REACT_APP_STAGE === "dev" &&
          <p>Current Player: {player.name}</p>
        } 
  
      </div>
    );
  } else {
    return (
      <div>Error on JudgeTurn</div>
    )
  }
}