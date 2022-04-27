import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Server, Socket } from "socket.io";

export type BreakData = {
    status: string;
    startsIn: number;
    duration: number;
}

export type TimeData = {
    timeLeft: number;
    breakTimeLeft?: number; 
    breaks: BreakData[];
}

export interface ServerToClientEvents {
    // noArg: () => void;
    // basicEmit: (a: number, b: string, c: Buffer) => void;
    // withAck: (d: string, callback: (e: number) => void) => void;
    getTime: (data:TimeData) => void;
    break: void;
    endBreak: void;
}
  
export interface ClientToServerEvents {
    hello: () => string;
    getTime: (cb: (response: any) => void) => void;
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
