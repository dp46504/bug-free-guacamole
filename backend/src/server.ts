import express, { Request, Response } from 'express';
import { Server } from "socket.io";
import http from 'http';
import cors from 'cors';
import routes from './routes';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from './types';
import auth from './services/socketAuth';
import registerHandlers from './handlers/timeHandlers';

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

    registerHandlers(io, socket);
    console.log('a user connected', socket.data.user?.uuid);
});

server.listen(port, () => {console.log(`Server listening on port ${port}`)});