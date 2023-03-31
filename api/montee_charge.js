const { ObjectId } = require("mongodb");
const db = require("./db");
const { updateDocument } = require("./services/common");

var doc = {
  code_IATA: "LBG",
  nom: "Aéroport de Paris-Le Bourget",
  ville: "Paris",
  pays: "France",
  location: {
    type: "Point",
    coordinates: [2.3522219, 48.856614],
  },
  vols: [],
};

for (i = 0; i <5000; i++) {
  try {
    const collection = db.collection("airport");
    collection.insertOne(doc);
    console.log("done");
  } catch (err) {
    console.error(err);
  }
}
