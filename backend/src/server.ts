import express from 'express';
import { Request, Response } from 'express';
import { Server } from "socket.io";
import http from 'http';
import routes from './routes';
import jwt from 'jsonwebtoken';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData, TokenData } from './types';
import dotenv from "dotenv";

dotenv.config();

const port = 5000;
const app = express();
const server = http.createServer(app);
const io = new Server<ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData>(server);

app.use(express.json());
app.use('/', routes);
app.get('/client', (req: Request, res: Response) => res.sendFile("public/index.html", { root: "." }));

io.use(async (socket, next) => {
  if (socket.handshake.auth && socket.handshake.auth.token){
    let token = socket.handshake.auth.token;
    const secret = process.env.SECRET_ACCESS_TOKEN;

    if (secret === undefined){
      next(new Error("Bad secret"));
      return;
    }

    let payload: TokenData;

    try{

      payload = await jwt.verify(token, secret) as TokenData;
    }catch(e){
      next(new Error("Didnt get payload"));
      return;
    }

    if (typeof payload === "string"){
      next(new Error("Bad payload"));
      return;
    }

    socket.data.user = { uuid: payload.uuid };
    next();
  }else{
    next(new Error("Bad query"));
      return;
  }
})
io.on('connection', (socket) => {
    console.log('a user connected', socket.data.user?.uuid);
});

server.listen(port, () => {console.log(`Server listening on port ${port}`)});