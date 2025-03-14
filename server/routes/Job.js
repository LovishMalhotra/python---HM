const express = require("express");
const {
  getJobs,
  postJob,
  deleteJobById,
  companyLogin,
  fetchJobByLocation,
  getJobById,
} = require("../controllers/Job");
const router = express.Router();

router
  .get("/allJobs", getJobs)
  .post("/postJob", postJob)
  .post("/companyLogin", companyLogin)
  .get("/location/:location", fetchJobByLocation)
  .delete("/:id", deleteJobById)
  .get("", getJobById);

exports.router = router;
