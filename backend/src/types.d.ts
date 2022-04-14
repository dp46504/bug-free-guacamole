import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Server, Socket } from "socket.io";

export type BreakData = {
    startsIn: number;
    duration: number;
}

export type TimeData = {
    timeLeft: number;
    breaks: BreakData[];
}

export interface ServerToClientEvents {
    // noArg: () => void;
    // basicEmit: (a: number, b: string, c: Buffer) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
    getTime: (data:TimeData) => void;
}
  
export interface ClientToServerEvents {
    hello: () => string;
    getTime: () => Promise<void|null>; 
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    user: {
        uuid: string;
    }
}

export interface TokenPayload implements JwtPayload {
    uuid: string;
    role: string;
}
