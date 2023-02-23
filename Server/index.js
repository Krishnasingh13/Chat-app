const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("../Server/routes/userRoutes");
const messageRoutes = require("../Server/routes/messageRoutes");
const PORT = 5000;

//App config
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

//DB config
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("Connection Failed");
    console.log(err);
    // process.exit(1)
  });

//API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//Listener
const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`server is started at ${process.env.PORT}`);
});

//socket io
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    Credential: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
