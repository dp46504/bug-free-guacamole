import { Request, Response } from "express";
import { prisma } from "../../../services/prismaClient";

interface userWorktimeInterface {
    definedTime: Date;
    start: Date|null;
    end: Date|null;
    status?: string;
}

export default async (req: Request, res: Response) => {
    const searchedUserUuid = req.body.searchedUserUuid;

    if (searchedUserUuid === undefined){
        res.send(400);
        return;
    }

    const userUuid = req.body.user.uuid;

    let user = null;

    try {
      user = await prisma.user.findFirst({
        where: {
          uuid: userUuid,
        },
        select: {
          id: true,
          admin: true
        },
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
      return;
    }

    if (user === null || !user.admin) {
      res.sendStatus(403);
      return;
    }

    let worktimes:userWorktimeInterface[] = [];

    try {
        worktimes = await prisma.workRegister.findMany({
            where: {
                user: {
                    uuid: searchedUserUuid
                }
            },
            select: {
                definedTime: true,
                start: true,
                end: true
            }
        });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    if (worktimes.length === 0) {
        res.send(null);
        return;
    }

    const now = new Date();
    worktimes.map((worktime) => {
        if (worktime.end === null) {
            return;
        }
        
        let worktimeEnd = new Date(worktime.end);
        worktime.status = worktimeEnd.getTime() < now.getTime() ? "done" : "in progress";
    });

    res.send(worktimes);
    return;
};
