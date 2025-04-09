const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("test api");
});

app.listen(4000, () => {
  console.log("server started on 4000");
});
