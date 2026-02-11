const { createServer } = require("http"); //create http server of nodejs
const { parse } = require("url"); //url parse for route matching
const next = require("next"); //initialize next js app
const { Server } = require("socket.io"); //socket server class

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler(); // this function returns a function which is handled by all next js routes--> handle(req,res,parsedUrl)--> internally it routes the page(/about, /services), handles api routes, serves static files, renders server components--brain of nextjs--what to do with each req it decides

//app.prepare builds next js in dev mode, compiles page, routes setup, if it isn't ready, it cant handle request. it returns a promise thats why .then
app.prepare().then(() => {
  //creating standard http server
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handler(req, res, parsedUrl);
    } catch (error) {
      console.error("Error occurred handling", req.url, error);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  });
  // Socket.io Initialization
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.DASHBOARD_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  //Connection Handler
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket, socket.id);
    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  global.io = io;

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log("> Socket.io server initialized");
    });
});
