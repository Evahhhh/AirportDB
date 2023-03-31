const { ObjectId } = require("bson");
const { findDocuments } = require("./common");

async function averageAiport(collection) {
  return await collection
    .aggregate([
      { $match: { pays: "Vietnam" } },
      {
        $group: {
          _id: null,
          avgLatitude: { $avg: "$location.coordinates[1]" },
          avgLongitude: { $avg: "$location.coordinates[0]" },
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

    return data.filter((el) => el._id.toString() !== id.toString());
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
  const airports = await collection.find().toArray();

  const filteredAirports = airports.filter((airport) => {
    const hasVolWithGreatherCapacity = airport.vols.some((vol) => {
      return parseInt(vol.avion.capacite) > parseInt(capacity);
    });
    return hasVolWithGreatherCapacity;
  });

  return filteredAirports;
}


module.exports = {
  averageAiport,
  airportArround,
  averageFly,
  currentFly,
  airportCapacityGreatherThan,
};
