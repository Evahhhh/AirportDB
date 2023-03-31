const { ObjectId } = require("bson");
const { findDocuments } = require("./common");

async function averageAiport(collection) {
  const data = await collection.find({ pays: "Vietnam" }).toArray();
  let avgLatitude = 0;
  let avgLongitude = 0;
  data.map((el) => {
    avgLongitude += el.location.coordinates[0];
    avgLatitude += el.location.coordinates[1];
  })
  return {
    avgLatitude: avgLatitude / data.length,
    avgLongitude: avgLongitude / data.length,
  };
}

async function averageFly(collection) {
  const data = await collection
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
  return data;
}

async function airportArround(collection, id) {
  collection.createIndex({ location: "2dsphere" });
  const findAirportArround = await collection
    .find({ _id: new ObjectId(id) })
    .toArray();
  const data = await collection
    .find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: findAirportArround[0].location
              ? [
                  findAirportArround[0].location.coordinates[0],
                  findAirportArround[0].location.coordinates[1],
                ]
              : [
                  findAirportArround[0].coordonnees_gps.longitude,
                  findAirportArround[0].coordonnees_gps.latitude,
                ],
          },
          $maxDistance: 100000, // distance en mètres
        },
      },
    })
    .toArray();

  return data.filter((el) => el.id !== id);
}

async function currentFly(collection, company) {
  const data = await collection
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

  return Array.from(new Set(data.map(JSON.stringify))).map(JSON.parse);
}

async function airportCapacityGreatherThan(collection, capacity) {
  const response = await collection.find().toArray();
  let isGreatherThan = 0;
  response.map((res) => {
    return res.vols.map((vol) => {
      if (parseInt(vol.avion.capacite) > parseInt(capacity)) isGreatherThan++;
    });
  });
  return response;
}

module.exports = {
  averageAiport,
  airportArround,
  averageFly,
  currentFly,
  airportCapacityGreatherThan,
};
