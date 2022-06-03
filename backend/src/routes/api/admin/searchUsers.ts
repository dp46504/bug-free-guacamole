import { Request, Response } from "express";
import { prisma } from "../../../services/prismaClient";
import { WorkRegister } from "@prisma/client"

interface userInfoInterface {
    uuid: string;
    firstname: string;
    lastname: string;
    workRegister: WorkRegister[];
    status?: string;
    timeLeft?: number;
  }

export default async (req: Request, res: Response) => {
    if (req.body.search === undefined){
        res.sendStatus(400);
        return;
    }

    let first = req.body.search.split(" ")[0];
    let second = req.body.search.split(" ")[1];

    if (first === undefined || first.length <= 0){
        res.sendStatus(400);
        return;
    }

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let info:userInfoInterface[] = [];
    try {
        info = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        firstname: {
                            startsWith: first
                        }, 
                        lastname: {
                            startsWith: second
                        }
                    },
                    {
                        firstname: {
                            startsWith: second
                        }, 
                        lastname: {
                            startsWith: first
                        }
                    }
                ]
            },
            select: {
                uuid: true,
                firstname: true,
                lastname: true,
                workRegister: {
                    where: {
                        start: { 
                            gte: today,
                            lte: tomorrow
                        }
                    },
                    orderBy: {
                        end: "desc"
                    },
                    take: 1
                }
            }
        });
    }catch(e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }
    
    if (info === null || info === undefined || info.length === 0) {
        res.sendStatus(403);
        return;
    }

    let now = new Date();
    info.forEach(user => {
        if (user.workRegister.length <= 0) {
            user.status = "not started";
        }else if (user.workRegister[0].end !== null && user.workRegister[0].end.getTime() > now.getTime()){
            user.status = "ongoing";
            user.timeLeft = user.workRegister[0].end.getTime() - now.getTime();
        }else{
            user.status = "ended";
        }
    });

    res.send(info);
    return;
}