import { Request, Response } from "express";
import { prisma } from "../../services/prismaClient";

export default async (req: Request, res: Response) => {
    let date = req.body.date;

    // if(!Date.parse(date)){
    //   res.sendStatus(400);
    //   return;
    // }

    date = new Date(date);

    const userUuid = req.body.user.uuid;

    let user = null;

    try {
      user = await prisma.user.findFirst({
        where: {
          uuid: userUuid,
        },
        select: {
          id: true,
        },
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
      return;
    }

    if (user === null) {
      res.sendStatus(403);
      return;
    }

    // const worktime = await prisma.workRegister.findFirst({
    //     where : {
    //       userId : user.id,
    //       start: {
    //         // new Date(start.getDate()) == date.getDate()
    //         equals: date
    //       },
    //     },
    //     select : {
    //       definedTime: true
    //     }
    // });

    const worktime = await prisma.$queryRaw`SELECT CAST(definedTime AS DATE) FROM WorkRegister`

    if (worktime === null) {
      res.send("No job done");
    }

    res.send(worktime);
    return;
};
