import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import connectDB from "./config/mongoose-connection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server, app } from "./config/socket.js";
dotenv.config();

connectDB();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chat-hub-jass.vercel.app",
    credentials: true,
  })

);



app.get("/", (req, res) => {
  res.send("Welcome to ChatNest API");
});

const port = process.env.PORT || 3001;

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});


