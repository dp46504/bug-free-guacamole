export interface ServerToClientEvents {
    // noArg: () => void;
    // basicEmit: (a: number, b: string, c: Buffer) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
}
  
export interface ClientToServerEvents {
    
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    user: {
        uuid: string;
    }
}

export interface TokenData {
    uuid: string;
    iat: number;
}
