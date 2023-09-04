require('dotenv').config();

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const userRoute = require('./routes/userRoute');
const todoRoute = require('./routes/todoRoute');

const app = express();

// MIDDLE WARE
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API
app.use('/api/users', userRoute);
app.use('/api/todo', todoRoute);

const port = process.env.PORT || 8002;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
