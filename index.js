const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const db = require('./config/database');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
