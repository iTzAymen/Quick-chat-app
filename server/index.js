require("dotenv").config();
const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (message) => {
    io.emit("message", message, socket.id);
  });
});
const port = process.env.PORT || 8080;
http.listen(port, "0.0.0.0", () => console.log(`listening on port ${port}`));
