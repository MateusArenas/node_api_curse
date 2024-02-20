import { Server } from 'http';
import socket from 'socket.io';

export const WebsocketModule = (server: Server) => {
  const io = new socket.Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');
  });

  return io;
};
