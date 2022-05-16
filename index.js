import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const port = process.env.PORT;
const app = express();
app.use(cors());

const PlayerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  club: String,
  yearOfBirth: Number,
});
const Player = mongoose.model("Player", PlayerSchema, "players");

app.use("/players", async (req, res) => {
  try {
    const players = await Player.find().exec();
    console.log(players);
    res.json(players);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(port, () => {
    console.log(`nationalteam API is listeing on ${port}`);
  });
});
