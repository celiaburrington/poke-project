// The server runs on localhost port 8000.
// startServer() is a function that starts the server
// the server will listen on .env.CLIENT_URL if set, otherwise 8000
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import session, { SessionOptions } from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import * as http from 'http';

import { PokeProjectSocket } from './types/types';
import userController from './controllers/user.controller';
import locationController from './controllers/location.controller';
import encounterController from './controllers/encounter.controller';
import pokemonController from './controllers/pokemon.controller';
import favoriteController from './controllers/favorite.controller';

dotenv.config();

const MONGO_URL = `${process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017'}/poke_project`;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const port = parseInt(process.env.PORT || '8000');

const app = express();
const server = http.createServer(app);
const socket: PokeProjectSocket = new Server(server, {
  cors: { origin: '*' },
});

function connectDatabase() {
  return mongoose.connect(MONGO_URL).catch(err => console.log('MongoDB connection error: ', err));
}

function startServer() {
  connectDatabase();
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

socket.on('connection', socket => {
  console.log('A user connected ->', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    mongoose.disconnect();
    console.log('Server closed.');
    process.exit(0);
  });
  socket.close();
});

app.use(
  cors({
    credentials: true,
    origin: [CLIENT_URL],
  }),
);

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET || 'poke_project',
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== 'development') {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: 'none',
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
  res.end();
});

app.use('/user', userController(socket));
app.use('/location', locationController(socket));
app.use('/encounter', encounterController(socket));
app.use('/pokemon', pokemonController(socket));
app.use('/favorite', favoriteController(socket));

// Export the app instance
export { app, server, startServer };
