const express = require("express")
const router = express.Router()
const Feedback = require("./models/Feedback")

// https://rahmanfadhil.com/express-rest-api/

router.post("/feedback", async (req, res) => {
  const feedback = new Feedback({
    name: req.body.name,
    email: req.body.email,
    feedback: req.body.feedback,
  });

  await feedback.save();

  console.log(feedback)

  res.status(201).send(feedback);
})

module.exports = router;