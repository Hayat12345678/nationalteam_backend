import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const port = process.env.PORT;
const app = express();
app.use(cors());

const playerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  club: String,
  yearOfBirth: Number,
});
const Player = mongoose.model("Player", playerSchema, "players");

app.use("/players", async (req, res) => {
  try {
    const players = await Player.find().exec();
    res.json(players);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(port, () => {
    console.log(`nationalTeam API is listeing on ${port}`);
  });
});
