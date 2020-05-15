const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const COLLECTION = req.db_instance.collection("data");

  let ops = {};

  if (req.body.filters.length !== 0) {
    req.body.filters.forEach((filter) => {
      let queryOperator = null;

      if (filter.operator === "equal") queryOperator = { $eq: filter.value };
      else if (filter.operator === "between")
        if (filter.key === "created_at")
          queryOperator = {
            $gte: new Date(filter.value[0]),
            $lte: new Date(filter.value[1]),
          };
        else
          queryOperator = {
            $gte: filter.value[0],
            $lte: filter.value[1],
          };
      else if (filter.operator === "contains")
        queryOperator = {
          $regex: filter.value.toLowerCase(),
        };

      ops[filter.key] = queryOperator;
    });
  }

  try {
    const responseData = await COLLECTION.find(ops)
      .skip(req.body.skipCount)
      .limit(req.body.productsCount)
      .toArray();
    res.status(200).send(responseData);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
