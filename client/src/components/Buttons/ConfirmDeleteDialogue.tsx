import { Socket } from "socket.io-client";
import { Game } from "../../data/classes/Game";
import { EVENTS } from "../../data/constants/socketEvents"
import { ViewPropsType } from "../../data/types/ViewPropsType"

type DialoguePropsType = {
  game: Game;
  socket: Socket;
  setShowDialogue: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConfirmDeleteDialogue = ({game, socket, setShowDialogue}: DialoguePropsType): JSX.Element => {
  const handleConfirmationBox = () => {
    console.log("Cancel")
    setShowDialogue(false)
  }

  const handleDeleteTask = () => {
    console.log("Delete Lobby")
    deleteLobby();
  }

  const deleteLobby = () => {
    socket.emit(EVENTS.deleteLobby, game)
  }


  return (
    <div className="confirm-delete-dialogue">

      <div className="container">

        <div className="confirmation-text">
          Are you sure you want to quit?
        </div>

        <div className="button-container">

          <button 
            className="resume-game" 
            onClick={() => handleConfirmationBox()}>
              Resume
          </button>

          <button 
            className="end-game"
            onClick={handleDeleteTask}>
              Exit Game
          </button>

        </div>

      </div>

      <div 
        className="confirm-bg">
        onClick={() => handleConfirmationBox()}
      </div>

    </div>
  )
}