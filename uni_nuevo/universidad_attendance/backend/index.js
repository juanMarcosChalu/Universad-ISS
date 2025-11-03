const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const db = require('./db');
const attendanceRouter = require('./routes/attendance');
const materiaRouter = require('./routes/materia');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', materiaRouter);
app.use('/api', attendanceRouter);

app.get('/', (req, res) => res.send('Universidad Attendance API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('✅ Server listening on', PORT));
