import express from 'express';
import { Request, Response } from 'express';
import { Server } from "socket.io";
import http from 'http';
import routes from './routes';
import jwt from 'jsonwebtoken';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from './types';
import dotenv from "dotenv";
import cors from 'cors';
import auth from './services/socketAuth';

const port = 5000;
const app = express();
const server = http.createServer(app);
const io = new Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData>(server);

app.use(cors())
app.use(express.json());
app.use('/', routes);

app.get('/client', (req: Request, res: Response) => res.sendFile("public/index.html", { root: "." }));

io.use(auth);

io.on('connection', (socket) => {
    console.log('a user connected', socket.data.user?.uuid);
});

server.listen(port, () => {console.log(`Server listening on port ${port}`)});