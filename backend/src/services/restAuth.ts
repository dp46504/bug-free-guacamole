import { Request, Response } from "express";
import { TokenPayload } from "../types";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async (req: Request, res: Response, next: () => void) => {

        if(!req.headers.authorization) {
            res.status(401).send("No authorization token");
            return;
        }
    
        const token = req.headers.authorization.split(" ")[1];
    
        if(token === "") {
            res.status(401).send("No authorization token");
            return;
        }

        const secret = process.env.SECRET_ACCESS_TOKEN;

        if (secret === undefined){
            res.sendStatus(500);
            return;
        }

        let payload: TokenPayload;

        try {
            payload = await jwt.verify(token, secret) as TokenPayload;
        } catch(e) {
            res.sendStatus(500);
            return;
        }
        
        req.body.user = {
            uuid: payload.uuid,
            role: payload.role
        };

        next();
  }