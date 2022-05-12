import { Request, Response } from "express";
import { prisma } from "../../../services/prismaClient";

interface userWorktimeInterface {
  definedTime: Date;
  start: Date|null;
  end: Date|null;
  status?: string;
}

export default async (req: Request, res: Response) => {
    if (req.body.year === undefined || req.body.month === undefined || req.body.day === undefined){
      res.sendStatus(400);
      return;
    }

    let year: number | string = req.body.year;
    let month: number | string = req.body.month;
    let day: number | string = req.body.day;

    if (month < 10) month = '0'+ month;
    if (day < 10) day = '0'+ day;

    const dateString = year + '-' + month + '-' + day; 
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

    let worktimes:Array<userWorktimeInterface> = [];

    worktimes = await prisma.$queryRaw`SELECT definedTime, start, end, User.firstname, User.lastname, User.uuid FROM WorkRegister JOIN User ON WorkRegister.userId = User.id WHERE DATE(ROUND(CAST(start AS DATE) / 1000), 'unixepoch') = ${dateString}`;

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
