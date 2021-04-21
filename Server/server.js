require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const route = require('./routes');
const port = process.env.PORT || 5000;
const db = require('./config/db');
// Connect to DB
db.connect();

app.use(cors());
app.use(express.json());
// app.use('/user', require('./routes/LoginRouter.js'));
// app.use('/register1', require('./routes/LoginRouter'));

// config use static file
app.use(express.static(path.join(__dirname, 'public')));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`server running in port ${port}`);
});

console.log(window.location.hostname);

console.log('server');
