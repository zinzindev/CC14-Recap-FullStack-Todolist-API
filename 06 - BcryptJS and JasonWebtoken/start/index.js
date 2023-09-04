require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');

const userRoute = require('./routes/userRoute');
const todoRoute = require('./routes/todoRoute');
const notFoundMiddleWare = require('./middlewares/notFound');
const errorMiddleWare = require('./middlewares/error');
const {sequelize} = require('./models')
const UserMiddleware = require('./middlewares/userAuthorize');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoute);
app.use('/api/todo', UserMiddleware.getUserByToken, todoRoute);

const port = process.env.PORT || 8002;
// sequelize.sync({ alter: true }).then(() => console.log("DATABASE SYNC"))
// sequelize.sync({ force: true }).then(() => console.log("DATABASE SYNC"))

app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
