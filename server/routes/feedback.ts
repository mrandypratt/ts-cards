import express from "express";
const apiroute = express.Router()
import Feedback from "../models/Feedback"

// https://rahmanfadhil.com/express-rest-api/

apiroute.post("/feedback", async (req, res) => {

  console.log("Feedback Received:")

  const feedback = new Feedback({
    name: req.body.name,
    email: req.body.email,
    feedback: req.body.feedback,
    time: req.body.time
  });

  await feedback.save();

  console.log("Feedback Saved")
  console.log(feedback)

  res.status(201).send(feedback);
})

export default apiroute;