import { createServer } from "http";

const server = createServer((req, res) => {
  res.writeHead(200);
  res.end("Yaya dingDong")
})

server.listen(3005, "localhost", () => {
  console.log("Serverksksks")
})

import express from 'express';
const app = express();

app.get("/", (req, res) => {
  res.send("MoreYayaDingDong")
})

app.listen(3004, () => {
  console.log("ExpressDingDong")
})