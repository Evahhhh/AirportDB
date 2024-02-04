const mongoose = require("mongoose");

// Set up default mongoose connection
const url = 'mongodb+srv://evah:evah@airdb.8d1zxtg.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connect to MongoDB"))
  .catch((err) => {
    console.log("Error to connect MongoDB");
  });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
