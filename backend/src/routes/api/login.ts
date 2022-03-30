import { Request, Response } from "express"
import { prisma } from "../../services/prismaClient";
import { Prisma } from "@prisma/client"
import jsonwebtoken from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { TokenData } from "../../types";

dotenv.config();

export default async (req: Request, res: Response) => {
    if(req.body.email === undefined || req.body.password === undefined){
        res.sendStatus(400);
        return;
    }

    const email = req.body.email;
    const password = req.body.password;

    let user;

    try{
        user = await prisma.user.findFirst({
            where: {
                email: email,
            },
            select: {
                hash: true,
                uuid: true
            }
        })

    }catch(e){
        console.log(e);
        res.sendStatus(500);
        return;
    }

    if(user === null){
        res.sendStatus(400);
        return;
    }

    const validPassword = await bcrypt.compare(password, user.hash);

    if(!validPassword){
        res.sendStatus(400);
        return;
    }

    const payload = {
        uuid: user.uuid
    }

    const secret = process.env.SECRET_ACCESS_TOKEN;

    if (secret === undefined){
        res.sendStatus(500);
        return;
    }

    const accessToken = await jsonwebtoken.sign(payload, secret);

    const data = {
        "accessToken": accessToken
    }
    
    res.send(data);
    return;
};