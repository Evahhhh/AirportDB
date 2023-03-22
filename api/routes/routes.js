var express = require("express");
const { ObjectId } = require("mongodb");
const db = require("../db");
var router = express.Router();
const {
  findDocuments,
  insertDocument,
  updateDocument,
  deleteDocument,
  aggregateDocuments,
} = require("../services/common");

router.get("/api/documents", async (req, res) => {
  try {
    const documents = await findDocuments(db, "airport", {});
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/api/documents", async (req, res) => {
  try {
    const document = req.body;
    const result = await insertDocument(db, "airport", document);
    res.json(result);
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/api/airport", async (req, res) => {
  try {
    const documents = await findDocuments(db, "airport", req.query);
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.put("/api/documents/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const update = req.body;
    const result = await updateDocument(db, "airport", filter, update);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/api/airport", async (req, res) => {
  try {
    const {
      numVol,
      heureArr,
      heureDep,
      airportArr,
      airportDep,
      modele,
      capacite,
      compagnie,
    } = req.body;
    const airportDepFind = await findDocuments(db, "airport", {
      code_IATA: airportDep,
    });
    const airportArrFind = await findDocuments(db, "airport", {
      code_IATA: airportArr,
    });
    console.log({ airportDepFind, airportArrFind });
    await updateDocument(
      db,
      "airport",
      { $or: [{ _id: airportDepFind[0]._id }, { _id: airportArrFind[0]._id }] },
      {
        $push: {
          vols: {
            numero_vol: numVol,
            heure_depart: heureDep,
            heure_arrivee: heureArr,
            aeroport_depart: {
              code_IATA: airportDepFind.code_IATA,
              nom: airportDepFind.nom,
              ville: airportDepFind.ville,
              pays: airportDepFind.pays,
            },
            aeroport_arrivee: {
              code_IATA: airportArrFind.code_IATA,
              nom: airportArrFind.nom,
              ville: airportArrFind.ville,
              pays: airportArrFind.pays,
            },
            avion: {
              modele,
              capacite,
              compagnie_aerienne: compagnie,
            },
          },
        },
      }
    );
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.delete("/api/documents/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await deleteDocument(db, "airport", filter);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/api/documents/aggregate", async (req, res) => {
  try {
    const pipeline = req.body;
    const result = await aggregateDocuments(db, "airport", pipeline);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/", async (req, res) => {
  res.send("Bienvenue sur l'api AirportDB");
});

module.exports = router;
