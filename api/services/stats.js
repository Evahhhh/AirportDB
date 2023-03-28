const { ObjectId } = require("mongodb");

async function averageAiport(collection) {
  return await collection
    .aggregate([
      { $match: { pays: "Vietnam" } },
      {
        $group: {
          _id: null,
          avgLatitude: { $avg: "$coordonnees_gps.latitude" },
          avgLongitude: { $avg: "$coordonnees_gps.longitude" },
        },
      },
      { $project: { _id: 0, avgLatitude: 1, avgLongitude: 1 } },
    ])
    .toArray();
}

async function averageFly(collection) {
  return await collection
    .aggregate([
      {
        $match: {
          $or: [
            { "vols.aeroport_depart.pays": "France" },
            { "vols.aeroport_depart.pays": "Vietnam" },
          ],
        },
      },
      { $unwind: "$vols" },
      { $group: { _id: null, totalVols: { $sum: 1 } } },
      { $project: { _id: 0, totalVols: 1 } },
    ])
    .toArray();
}

async function airportArround(collection, id) {
  collection.createIndex({ location: "2dsphere" });
  const findAirportArround = await collection
    .find({
      _id: new ObjectId(id),
    })
    .toArray();
  return await collection
    .find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              findAirportArround[0].coordonnees_gps.longitude,
              findAirportArround[0].coordonnees_gps.longitude,
            ],
          },
          $maxDistance: 100000000,
        },
      },
    })
    .toArray();
}

async function currentFly(collection, company) {
  return await collection
    .aggregate([
      {
        $match: {
          $or: [{ pays: "Vietnam" }, { pays: "France" }],
        },
      },
      {
        $unwind: "$vols",
      },
      {
        $match: { "vols.avion.compagnie_aerienne": company },
      },
      {
        $project: {
          _id: 0,
          numero_vol: "$vols.numero_vol",
          aeroport_depart: "$vols.aeroport_depart",
          aeroport_arrivee: "$vols.aeroport_arrivee",
        },
      },
    ])
    .toArray();
}

async function airportCapacityGreatherThan(collection, capacity) {
  const response = await collection.find().toArray();
  let isGreatherThan = 0;
  response.map((res) => {
    return res.vols.map((vol) => {
      if (parseInt(vol.avion.capacite) > parseInt(capacity)) isGreatherThan++;
    });
  });

  return isGreatherThan;
}

module.exports = {
  averageAiport,
  airportArround,
  averageFly,
  currentFly,
  airportCapacityGreatherThan,
};
