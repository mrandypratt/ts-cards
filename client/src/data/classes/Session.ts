import ShortUniqueID from "short-unique-id";

const sessionIdGenerator = new ShortUniqueID({length: 20});

export class Session {
  sessionId: string;
  socketId: string;

  constructor(socketId: string) {
    this.sessionId = sessionIdGenerator();
    this.socketId = socketId
  }

  updateSocketId(socketId: string): void {
    this.socketId = socketId;
  }
};

