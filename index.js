const express = require('express');
const app = express();
const cors = require('cors');
const {connectToDatabase} = require('./database/dbSetup')
const taskRoute = require('./routes/tasksRoute.js');
const dotenv = require('dotenv');
dotenv.config();
connectToDatabase();

const corsOptions = { origin: process.env.CLIENT_URL };

app.use(cors(corsOptions));
app.use(express.json());
app.use(taskRoute);

app.listen(process.env.API_PORT, () => {
    console.log('listening on port ' + process.env.API_PORT);
});