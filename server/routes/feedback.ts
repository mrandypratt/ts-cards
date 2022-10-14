import express from "express";
const apiroute = express.Router()
import Feedback from "../models/Feedback"

// https://rahmanfadhil.com/express-rest-api/

apiroute.post("/feedback", async (req, res) => {

  console.log("Feedback Received:")
  console.log("------------------")
  console.log(`Name: ${req.body.name}`)
  console.log(`Name: ${req.body.email}`)
  console.log(`Name: ${req.body.feedback}`)

  const feedback = new Feedback({
    name: req.body.name,
    email: req.body.email,
    feedback: req.body.feedback,
  });

  await feedback.save();

  console.log("Feedback below complete:")
  console.log(feedback)

  res.status(201).send(feedback);
})

export default apiroute;