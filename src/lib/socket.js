import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Setting up Socket.io");

    const io = new Server(res.socket.server, {
      cors: {
        origin: "http://localhost:5173",
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
