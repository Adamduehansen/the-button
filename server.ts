import * as path from "path";
import * as  express from "express";
import * as http from "http";
import * as io from "socket.io";

interface Click {
  name: string;
  dateTime: Date;
}

class GameServer {
  private server: http.Server;
  private socket: io.Server;
  private state: Click[];

  constructor() {
    this.setupServer();
    this.setupState();
    this.setupSocketIo();
  }

  /**
   * Setup server
   */
  setupServer() {
    const app = express()
    app.use(express.static(path.resolve(__dirname, "wwwroot")));
    this.server = new http.Server(app);
  }

  /**
   * Setup initial state.
   */
  setupState() {
    this.state = [];
  }

  /**
   * Setup socket and their events.
   */
  setupSocketIo() {
    this.socket = io(this.server);
    this.socket.on("connection", (socket: io.Socket) => {
      socket.emit("connected", this.state);
      socket.on("click", (data: Click) => {
        this.state = [...this.state, data];
      });
    });
  }

  /**
   * Starts the server.
   * @param port The server port
   * @param callBack A callback function called after server is started.
   */
  public Start(port:number, callBack: () => any) {
    this.server.listen(port, callBack);
  }
}

const server = new GameServer();
server.Start(3000, () => console.log("Server is started!"));
