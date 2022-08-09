import { Socket } from "socket.io-client";
import { EVENTS } from "../../data/constants/EVENTS"

type DialoguePropsType = {
  socket: Socket;
  setShowDialogue: React.Dispatch<React.SetStateAction<boolean>>
  messages: string[];
}

export const ConfirmDeleteDialogue = ({socket, setShowDialogue, messages}: DialoguePropsType): JSX.Element => {
  const hideDialogue = () => {
    setShowDialogue(false)
  }

  const deleteLobby = () => {
    socket.emit(EVENTS.client.deleteLobby)
  }

  return (
    <div className="confirm-delete-dialogue">

      <div className="container">

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
            onClick={() => deleteLobby()}>
              End Game
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