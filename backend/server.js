// framework for backend
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
//middleware to help connect backend
const bodyParser = require('body-parser');

//load config 
dotenv.config();

//connect database
connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyparser());

//define route
app.use('/api/users', require('./routes/userRoutes'));
app.use('./api/transactions', require('./routes/transactionRoutes'));
app.use('./api/budgets', require('./routes/budgetRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));