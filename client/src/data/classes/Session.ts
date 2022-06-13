import ShortUniqueID from "short-unique-id";
import { VIEWS } from "../types/VIEWS";

const sessionIdGenerator = new ShortUniqueID({length: 20});

class Session {
  sessionId: string;
  socketId: string;
  name: string | null;
  gameLobbyId: string | null
  view: string;

  constructor(socketId: string) {
    this.sessionId = sessionIdGenerator();
    this.socketId = socketId
    this.name = null;
    this.gameLobbyId = null;
    this.view = VIEWS.home;
  }

};

class SessionStore {
  sessions: Session[];

  constructor() {
    this.sessions = [];
  }

  createSession(socketId: string): void {
    this.sessions.push(new Session(socketId));
  }

  findSession(sessionId: string): Session | null {
    let session = this.sessions.find(session => session.sessionId === sessionId);
    if (session) return session;
    return null;
  }

  findSessionBySocketId(socketId: string): Session | null {
    let session = this.sessions.find(session => session.socketId === socketId);
    if (session) return session;
    return null;
  }

}



export const sessionStore = new SessionStore();

