require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URL;
mongoose.connect(
  uri,
  {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connect Mongo successfulllll");
  }
);

app.get("/", (req, res) => {
  res.json({ dm: "hihi" });
});

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
