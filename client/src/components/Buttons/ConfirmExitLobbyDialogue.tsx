import { Socket } from "socket.io-client";
import { EVENTS } from "../../data/constants/EVENTS"

type DialoguePropsType = {
  socket: Socket;
  setShowDialogue: React.Dispatch<React.SetStateAction<boolean>>
  messages: string[];
}

export const ConfirmExitLobbyDialogue = ({socket, setShowDialogue, messages}: DialoguePropsType): JSX.Element => {
  const hideDialogue = () => {
    setShowDialogue(false)
  }

  const exitLobby = () => {
    socket?.emit(EVENTS.client.exitLobby);
  }

  return (
    <div className="confirm-delete-dialogue">

      <div className="cdd-container">

          { messages.map(message => {
            return (
              <div 
                className="confirmation-text"
                key={message}>
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