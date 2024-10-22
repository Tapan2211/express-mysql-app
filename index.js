const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const students = require('./routes/student.routes');
const productCategory = require('./routes/product_category.route');
const categories = require('./routes/categories.routes');

const cors = require('cors');
const db = require('./config/database');
require('dotenv').config();

const app = express();

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Enable CORS
app.use(cors());
app.options("*", cors());


app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', employeeRoutes);
app.use('/api', students);
app.use('/api', productCategory);
app.use('/api', categories);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

