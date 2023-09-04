require("dotenv").config();
require('./config/passport');

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");
const AuthenWithpassportJWT = require('./middlewares/passportJWT');
const notFoundMiddleWare = require("./middlewares/notFound");
const errorMiddleWare = require("./middlewares/error");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/todo", AuthenWithpassportJWT, todoRoute);

const port = process.env.PORT || 8002;
// sequelize.sync({ force: true }).then(() => console.log("DATABASE SYNC"))

app.use(notFoundMiddleWare);
app.use(errorMiddleWare);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
