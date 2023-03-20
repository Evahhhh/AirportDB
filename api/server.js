const connect = require("./db");
var express = require("express");
var router = require("./routes/routes");

const app = express();
app.use("/", router);

app.listen(5150, () => {
  console.log("Server is running on port 5150");
});