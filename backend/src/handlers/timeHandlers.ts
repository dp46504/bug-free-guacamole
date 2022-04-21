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
                status: "authentication failed",
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
                status: "work entry not found",
                data: null
            })
            return;
        }

        const timeLeft = workTime.end.getTime() - now.getTime();
        let breaks: BreakData[] = [];

        for(let br of workTime.breakRegister){
            const startsIn = now.getTime() - br.start.getTime();
            const duration = br.definedTime.getMinutes();
            
            breaks.push({
                startsIn: startsIn,
                duration: duration
            })
        }

        const timeData: TimeData = {
            timeLeft: timeLeft,
            breaks: breaks,
        } 
    
        cb({
            status: "ok",
            data: timeData
        })
        return;
    };

    socket.on("getTime", getTimeHandler);
}