const { Job } = require("../models/job.js");


// to do
exports.searchJob = async (req, res) => {
  try {
    const { subject, city } = req.query;
    if (!subject && !city) {
      return res.status(400).send("Subject or City is required");
    }

    if (!city) {
      const jobs = await Job.find({ subject });
      res.status(201).send({ status: true, jobs });
    } else if (!subject) {
      const jobs = await Job.find({ city });
      res.status(201).send({ status: true, jobs });
    } else {
      const jobs = await Job.find({ subject, city });
      res.status(201).send({ status: true, jobs });
    }
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
