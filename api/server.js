const cors = require('cors')
var express = require("express");
var router = require("./routes/routes");

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use("/", router);

app.listen(5150, () => {
  console.log("Server is running on port 5150");
});