import { VIEWS } from "../../client/src/data/constants/VIEWS";
import { Session } from "./classes/Session";

class SessionStore {
  sessions: Session[];

  constructor() {
    this.sessions = [];
  }

  createSession(socketId: string, lobbyId: string | null, view: string): Session {
    const session = new Session(socketId, lobbyId, view);
    this.sessions.push(session);
    return session;
  }
  
  recreateSession(sessionId: string, socketId: string, lobbyId: string | null, view: string): Session {
    const session = new Session(socketId, lobbyId, view);
    session.id = sessionId;
    this.sessions.push(session);
    return session;
  }

  findSession(sessionId: string): Session | null {
    let session = this.sessions.find(session => session.id === sessionId);
    if (session) return session;
    return null;
  }

  findSessionBySocketId(socketId: string): Session | null {
    let session = this.sessions.find(session => session.socketId === socketId);
    if (session) return session;
    return null;
  }

  resetSession(sessionId: string): void {
    const session = this.findSession(sessionId);
    if (session) {
      session.lobbyId = null;
      session.view = VIEWS.home
    }
  }

  getSocketId(sessionId: string): string {
    const socketId = this.findSession(sessionId)?.socketId;
    if (socketId) return socketId;
    return "error";
  }
}

export const sessionStore = new SessionStore();