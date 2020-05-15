const express = require("express");
const productRouter = require("./routes/products");
const path = require("path");
const cors = require("cors");
const connectDB = require("./database/db");

const app = express();

app.use(cors());
//Middleware to parse req body
app.use(express.json());

const port = process.env.PORT || 4000;

//Connecting to Database
connectDB()
  .then((result) => {
    //Defining product routes
    app.use(
      "/api/products",
      (req, res, next) => {
        req.db_instance = result;
        next();
      },
      productRouter
    );

    //Listening on port after db connections is successful
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
