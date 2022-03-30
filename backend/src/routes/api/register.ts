import { Request, Response } from "express"
import { prisma } from "../../services/prismaClient";
import { customAlphabet } from "nanoid";
import * as bcrypt from "bcrypt";

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 24);

export default async (req: Request, res: Response) => {

    if(req.body.email === undefined || req.body.firstname === undefined || req.body.lastname === undefined || req.body.password === undefined) {
        res.sendStatus(400);
        return;
    }

    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;

    const userExists = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    if(userExists) {
        res.sendStatus(400);
        return;
    }

    const uuid = nanoid();

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    try {

        await prisma.user.create({
            data: {
                uuid: uuid,
                email: email,
                firstname: firstname,
                lastname: lastname,
                hash: hash,
                admin: false,
                breakEvery: 120,
                breakTime: 15,
            }
        })

    } catch(e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }


    res.sendStatus(200);
    return;
}