import { Request, Response } from "express";
import { prisma } from "../../../services/prismaClient";

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

    let worktime:Array<Object> = [];

    worktime = await prisma.$queryRaw`SELECT definedTime, User.firstname, User.lastname, User.uuid FROM WorkRegister JOIN User ON WorkRegister.userId = User.id WHERE DATE(ROUND(CAST(start AS DATE) / 1000), 'unixepoch') = ${dateString}`;

    if (worktime.length === 0) {
        res.send(null);
        return;
    }

    res.send(worktime);
    return;
};
