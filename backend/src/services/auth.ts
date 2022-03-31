import { Socket } from "socket.io";
import { TokenPayload } from "../types";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async (socket: Socket, next: (err?: Error) => void) => {
    if (socket.handshake.auth && socket.handshake.auth.token){
        let token = socket.handshake.auth.token;
        const secret = process.env.SECRET_ACCESS_TOKEN;

        if (secret === undefined){
            next(new Error("Server Error"));
            return;
        }

        let payload: TokenPayload;

        try {
            payload = await jwt.verify(token, secret) as TokenPayload;
        } catch(e) {
            next(new Error("Didnt get payload"));
            console.log(e);
            return;
        }

        if (typeof payload === "string"){
            next(new Error("Bad payload"));
            return;
        }
        
        socket.data.user = {
            uuid: payload.uuid
        };
        next();
    }else{
        next(new Error("Bad query"));
        return;
    }
  }