import { Session } from "../client/src/data/classes/Session";

class SessionStore {
  sessions: Session[];

  constructor() {
    this.sessions = [];
  }

  createSession(socketId: string): Session {
    const session = new Session(socketId);
    this.sessions.push(session);
    return session;
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