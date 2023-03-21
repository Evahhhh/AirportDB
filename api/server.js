const cors = require("cors");
var express = require("express");
var router = require("./routes/routes");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/", router);

app.listen(5150, () => {
  console.log("Server is running on port 5150");
});