// Need to set Mongo URI on EC2
module.exports = {
  mongoURI: process.env.MONGO_URI || "",
};