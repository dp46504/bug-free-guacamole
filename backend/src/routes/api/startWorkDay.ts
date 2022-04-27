import { Request, Response } from "express"
import { prisma } from "../../services/prismaClient";

export default async (req: Request, res: Response) => {

    const hours = parseInt(req.body.workTime.split(":")[0])
    const minutes = parseInt(req.body.workTime.split(":")[1])

    const now = new Date();
    const definedTime = new Date(now.getTime());
    definedTime.setHours(hours);
    definedTime.setMinutes(minutes);

    const endTime = new Date(now.getTime());
    endTime.setHours(endTime.getHours() + hours);
    endTime.setMinutes(endTime.getMinutes() + minutes);

    let definedBreaks = []

    for(let i = 0; i < req.body.breaks.length; i++) {

        let b = req.body.breaks[i];

        if(Object.keys(b).length === 0) {
            continue;
        }
        
        const breakInHours = parseInt(b.breakIn.split(":")[0]);
        const breakInMinutes = parseInt(b.breakIn.split(":")[1]);

        const breakTime = new Date(now.getTime());
        breakTime.setMinutes(parseInt(b.breakTime));

        const startBreak = new Date(now.getTime());
        startBreak.setHours(startBreak.getHours() + breakInHours);
        startBreak.setMinutes(startBreak.getMinutes() + breakInMinutes);

        const endBreak = new Date(startBreak.getTime());
        endBreak.setMinutes(endBreak.getMinutes() + breakTime.getMinutes());
        definedBreaks.push({ startBreak: startBreak, endBreak: endBreak, breakTime: breakTime});
    }

    const userUuid = req.body.user.uuid;

    let user = null;

    try {
        user = await prisma.user.findFirst({
            where: {
                uuid: userUuid
            },
            select: {
                id: true,
            }
        });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    if(user === null) {
        res.sendStatus(403);
        return;
    }

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let workEntryExists = -1;

    try {
        workEntryExists = await prisma.workRegister.count({
            where: { 
                user: { 
                    uuid: userUuid
                },
                start: { 
                    gte: today,
                    lte: tomorrow
                }
            }
        })
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    if(workEntryExists !== 0) {
        res.sendStatus(400);
        return;
    }

    let workRegister = null;

    try {
        workRegister = await prisma.workRegister.create({
            data: {
                userId: user.id,
                definedTime: definedTime,
                start: now,
                end: endTime
            },
            select: {
                id: true
            }
        });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    if(workRegister === null) {
        res.sendStatus(500);
        return;
    }

    for(let b of definedBreaks) {

        try {
            const result = await prisma.breakRegister.create({
                data: {
                    workEntryId: workRegister.id,
                    definedTime: b.breakTime,
                    start: b.startBreak,
                    end: b.endBreak
                }
            });
        } catch(e) {
            console.log(e);
            res.sendStatus(500);
            return;
        }
    }

    res.sendStatus(200);
    return;
}
