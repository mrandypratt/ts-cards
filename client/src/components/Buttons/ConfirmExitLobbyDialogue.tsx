import { Socket } from "socket.io-client";
import { Game } from "../../data/classes/Game";
import { EVENTS } from "../../data/constants/socketEvents"

type DialoguePropsType = {
  game: Game;
  socket: Socket;
  setShowDialogue: React.Dispatch<React.SetStateAction<boolean>>
  messages: string[];
}

export const ConfirmExitLobbyDialogue = ({game, socket, setShowDialogue, messages}: DialoguePropsType): JSX.Element => {
  const hideDialogue = () => {
    setShowDialogue(false)
  }

  const exitLobby = () => {
    socket?.emit(EVENTS.exitLobby, game);
  }

  return (
    <div className="confirm-delete-dialogue">

      <div className="container">

          { messages.map(message => {
            return (
              <div className="confirmation-text">
                {message}
              </div>
            )
          })}

        <div className="button-container">

          <button 
            className="resume-game" 
            onClick={() => hideDialogue()}>
              Resume
          </button>

          <button 
            className="end-game"
            onClick={() => exitLobby()}>
              Exit Lobby
          </button>

        </div>

      </div>

      <div 
        className="confirm-bg">
        onClick={() => hideDialogue()}
      </div>

    </div>
  )
}