require("dotenv").config();
const { connection } = require("./db");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
// const userRouter = require("./routes/userRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the Database");
    console.log(`Server running at ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
