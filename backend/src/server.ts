import express from 'express';
import { Request, Response } from 'express';
import { Server } from "socket.io";
import http from 'http';
import routes from './routes';
import jwt from 'jsonwebtoken';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData, TimeData, BreakData } from './types';
import dotenv from "dotenv";
import cors from 'cors';
import auth from './services/socketAuth';
import { prisma } from "./services/prismaClient";

const port = 5000;
const app = express();
const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server);

app.use(cors())
app.use(express.json());
app.use('/', routes);

app.get('/client', (req: Request, res: Response) => res.sendFile("public/index.html", { root: "." }));

io.use(auth);

io.on('connection', (socket) => {
    console.log('a user connected', socket.data.user?.uuid);

    socket.on('getTime', async () => {
        const now = new Date();
        const data = socket.data;
        if(data === undefined || data.user === undefined){
            return null;
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
            return null;
        }

        const timeLeft = workTime.end.getTime() - now.getTime();
        let breaks:BreakData[] = [];

        for(let br of workTime.breakRegister){
            const startsIn = now.getTime() - br.start.getTime();
            const duration = br.definedTime.getMinutes();
            
            breaks.push({
                startsIn: startsIn,
                duration: duration
            })
        }

        const timeData:TimeData = {
            timeLeft: timeLeft,
            breaks: breaks,
        } 
        socket.emit('sendTimeData', timeData);
    });
});

server.listen(port, () => {console.log(`Server listening on port ${port}`)});