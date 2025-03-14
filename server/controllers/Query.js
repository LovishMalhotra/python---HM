const mongoose = require("mongoose");
const { Query } = require("../models/query.js");

exports.postQuery = async (req, res) => {
  const query = new Query(req.body);
  try {
    const result = await query.save();
    res.status(201).send({ status: true, query: result });
    console.log(result);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Internal server error");
  }
};
