import ShortUniqueID from "short-unique-id";

const sessionIdGenerator = new ShortUniqueID({length: 20});

export class Session {
  id: string;
  socketId: string;
  lobbyId: string | null;
  view: string;

  constructor(socketId: string, lobbyId: string | null, view: string) {
    this.id = sessionIdGenerator();
    this.socketId = socketId;
    this.lobbyId = lobbyId;
    this.view = view;
  }

  updateSocketId(socketId: string): void {
    this.socketId = socketId;
  }

  updateLobby(lobbyId: string | null): void {
    this.lobbyId = lobbyId;
  }

  updateView (view: string): void {
    this.view = view;
  }

};

