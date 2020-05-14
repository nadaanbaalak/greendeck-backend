const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const DB_URL = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const dbClient = await new MongoClient.connect(DB_URL, {
      useUnifiedTopology: true,
    });
    const database = await dbClient.db("greendeck");
    console.log("Connected to database....");
    return database; //returning DB instance
  } catch (error) {
    console.log("Error connecting to DB ", error);
  }
};

module.exports = connectDB;
