require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

const route = require('./routes');
const port = process.env.PORT || 5000;
const db = require('./config/db');
// Connect to DB
db.connect();

app.use(cors());
app.use(express.json());

// config use static file
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.json({ dm: "hihihi" });
});

app.listen(port, () => {
    console.log(`server running in port ${port}`);
});
