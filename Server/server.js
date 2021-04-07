require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user',require('./routes/LoginRouter.js'))

app.use("/register1",require("./routes/LoginRouter"))

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
    console.log("Connect Mongo successful.");
  }
);

app.get("/", (req, res) => {
  res.json({ dm: "hihi" });
});


app.listen(port, () => {
  console.log(`server running in port ${port}`);
});

console.log("server");
