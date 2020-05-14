const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const COLLECTION = req.db_instance.collection("data");
  const data = await COLLECTION.find({}, { limit: 3 }).toArray();
  console.log(data);
  console.log("Home Page :: Greendeck Products");
  res.send(data);
});

router.get();
module.exports = router;
