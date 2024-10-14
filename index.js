const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const students = require('./routes/student.routes');

const db = require('./config/database');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', employeeRoutes);
app.use('/api', students);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

