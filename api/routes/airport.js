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
  deleteFly,
  findFly,
  updateFly,
} = require("../services/common");
const {
  averageAiport,
  averageFly,
  airportCapacityGreatherThan,
  currentFly,
  airportArround,
} = require("../services/stats");

router.post("/api/airport", async (req, res) => {
  try {
    const body = req.body;
    const airport = await findDocuments(db, "airport", {
      code_IATA: body.code_IATA,
    });
    if (airport.length > 0) {
      throw new Error("Cet aéroport existe déjà");
    } else {
      const result = await insertDocument(db, "airport", body);
      res.json(result);
    }
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

router.get("/api/airport/fly", async (req, res) => {
  try {
    const documents = await findFly(db, "airport", req.query);
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/api/airportbyid", async (req, res) => {
  try {
    const documents = await findDocuments(db, "airport", req.query, true);
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/api/airport/fly", async (req, res) => {
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
    const findFly = await findDocuments(db, "airport", {
      "vols.numero_vol": numVol,
    });
    if (findFly.length > 0) {
      throw new Error("Numéro de vol existe déjà");
    }
    const airportDepFind = await findDocuments(db, "airport", {
      code_IATA: airportDep,
    });
    const airportArrFind = await findDocuments(db, "airport", {
      code_IATA: airportArr,
    });
    const collection = db.collection("airport");
    const result = await collection.updateMany(
      { $or: [{ _id: airportDepFind[0]._id }, { _id: airportArrFind[0]._id }] },
      {
        $push: {
          vols: {
            numero_vol: numVol,
            heure_depart: heureDep,
            heure_arrivee: heureArr,
            aeroport_depart: {
              code_IATA: airportDepFind[0].code_IATA,
              nom: airportDepFind[0].nom,
              ville: airportDepFind[0].ville,
              pays: airportDepFind[0].pays,
            },
            aeroport_arrivee: {
              code_IATA: airportArrFind[0].code_IATA,
              nom: airportArrFind[0].nom,
              ville: airportArrFind[0].ville,
              pays: airportArrFind[0].pays,
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
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/", async (req, res) => {
  res.send("Bienvenue sur l'api AirportDB");
});

router.delete("/api/airport/fly/:id/:num_vol", async (req, res) => {
  try {
    const id = req.params.id;
    const num_vol = req.params.num_vol;
    const result = await deleteFly(db, "airport", id, num_vol);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.put("/api/airport/fly/:id", async (req, res) => {
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
    const code_IATA = req.params.id;
    const filter = {
      $and: [{ code_IATA: code_IATA }, { "vols.numero_vol": numVol }],
    };
    const update = {
      $set: {
        "vols.$.heure_depart": heureDep,
        "vols.$.heure_arrivee": heureArr,
        "vols.$.aeroport_depart.code_IATA": airportDepFind[0].code_IATA,
        "vols.$.aeroport_depart.nom": airportDepFind[0].nom,
        "vols.$.aeroport_depart.ville": airportDepFind[0].ville,
        "vols.$.aeroport_depart.pays": airportDepFind[0].pays,
        "vols.$.aeroport_arrivee.code_IATA": airportArrFind[0].code_IATA,
        "vols.$.aeroport_arrivee.nom": airportArrFind[0].nom,
        "vols.$.aeroport_arrivee.ville": airportArrFind[0].ville,
        "vols.$.aeroport_arrivee.pays": airportArrFind[0].pays,
        "vols.$.avion.modele": modele,
        "vols.$.avion.capacite": capacite,
        "vols.$.avion.compagnie_aerienne": compagnie,
      },
    };
    const result = await updateFly(db, "airport", filter, update);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/api/airport/stats", async (req, res) => {
  try {
    const collection = db.collection("airport");
    //Trouver la moyenne de latitude et longitude des aéroports du Vietnam
    const avergageAirport = await averageAiport(collection);

    //Trouver le nombre total de vols au départ d'aéroports français et vietnamiens
    const avgVol = await averageFly(collection);

    //Trouver les aéroports situés à moins de 100 km d'un aéroport donné
    let airport;
    if (req.query.airportArround !== "undefined") {
      airport = await airportArround(collection, req.query.airportArround);
    }

    //Trouver les vols opérés par une compagnie aérienne donnée pour les aéroports en France et au Vietnam.
    const currentFlyCompany = await currentFly(collection, req.query.company);

    // Trouver les aéroports avec au moins un vol opéré par un avion ayant une capacité supérieure à un certain nombre
    const airportCapacity = await airportCapacityGreatherThan(
      collection,
      req.query.capacity
    );

    res.json({
      avgAirport: avergageAirport[0],
      avgVol: avgVol[0],
      currentFlyCompany: currentFlyCompany,
      airportCapacity,
      airport,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/api/airport/company", async (req, res) => {
  try {
    const collection = db.collection("airport");
    const response = await collection.distinct("vols.avion.compagnie_aerienne");
    res.json(response);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
