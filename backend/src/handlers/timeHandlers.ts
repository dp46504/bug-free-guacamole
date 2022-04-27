import { Server, Socket } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData, TimeData, BreakData } from '../types';
import { prisma } from '../services/prismaClient';

export default (io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>, 
                socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
                ) => {
    
    const getTimeHandler = async (cb: (response: any) => void) => {

        const now = new Date();
        const data = socket.data;
        if(data === undefined || data.user === undefined){
            cb({
                error: "authentication failed",
                data: null
            });
            return;
        }
        const uuid = data.user.uuid;

        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
    
        const workTime = await prisma.workRegister.findFirst({
            where: { 
                user: { 
                    uuid: uuid
                },
                start: { 
                    gte: today,
                    lte: tomorrow
                }
            },
            select: {
                definedTime: true,
                start: true,
                end: true,
                breakRegister: true
            }
        })
        
        if(workTime === null || workTime.end === null){
            cb({
                error: "work entry not found",
                data: null
            })
            return;
        }

        const timeLeft = workTime.end.getTime() - now.getTime();
        let breaks: BreakData[] = [];

        let workStatus, breakStatus = "";
        let breakTimeLeft = null;

        if(timeLeft <= 0) {
            workStatus = "ended";
        } else if(timeLeft >= 0) {
            workStatus = "ongoing";
        }

        for(let br of workTime.breakRegister){
            const startsIn = br.start.getTime() - now.getTime();
            const endsIn = br.end.getTime() - now.getTime();
            const duration = br.definedTime;

            const breakLeft =  br.end.getTime() - now.getTime();


            if(startsIn > 0) {
                setTimeout(()=> {
                    socket.emit("break");
                }, startsIn);
            }

            if(endsIn > 0) {
                setTimeout(() => {
                    socket.emit("endBreak");
                }, endsIn);
            }

            if(startsIn <= 0 && breakLeft >= 0) {
                workStatus = "onBreak";
                breakStatus = "ongoing";
                breakTimeLeft = breakLeft;

            } else if(startsIn > 0) {
                breakStatus = "notStarted";
            } else {
                breakStatus = "ended";
            }

            breaks.push({
                status: breakStatus,
                startsIn: startsIn,
                duration: duration.getMinutes()
            })
        }

        const timeData: TimeData = {
            timeLeft: timeLeft,
            breakTimeLeft: breakTimeLeft != null ? breakTimeLeft : undefined,
            breaks: breaks,
        } 

        cb({
            status: workStatus,
            data: timeData
        })
        return;
    };

    socket.on("getTime", getTimeHandler);
}