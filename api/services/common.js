const { ObjectId } = require("bson");

const insertDocument = async (db, collectionName, document) => {
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(document);
  console.log(
    `Inserted ${result.insertedCount} document(s) into ${collectionName}`
  );
  return result;
};

const findFly = async (db, collectionName, query) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection
      .find({
        vols: {
          $elemMatch: {
            [`aeroport_${query.wanted}.code_IATA`]: query.code_IATA,
          },
        },
      })
      .toArray();
    console.log(result[0]);
    return result[0] && result[0].vols;
  } catch (error) {
    console.log("Error services common : findFly : ", error);
    return [];
  }
};

const deleteFly = async (db, collectionName, code_IATA, num_vol) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { code_IATA: code_IATA },
      { $pull: { vols: { numero_vol: num_vol } } }
    );
    console.log('Vol supprimé avec succès');
    return result;
  } catch (error) {
    console.log("Error services common : deleteFly : ", error);
    return [];
  }
};

const findDocuments = async (db, collectionName, filter, isId = false) => {
  if (isId) {
    try {
      key = Object.keys(filter)[0];
      filterString = key.toString();
      filter = { _id: new ObjectId(filterString) };
    } catch (err) {
      console.error("Error converting filter to ObjectId:", err);
      return [];
    }
  }
  const collection = db.collection(collectionName);
  const result = await collection.find(filter).toArray();
  console.log(`Found ${result.length} document(s) in ${collectionName}`);
  return result;
};

const updateDocument = async (db, collectionName, filter, update) => {
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(filter, { $set: update });
  console.log(
    `Updated ${result.modifiedCount} document(s) in ${collectionName}`
  );
  return result;
};

const deleteDocument = async (db, collectionName, filter) => {
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne(filter);
  console.log(
    `Deleted ${result.deletedCount} document(s) from ${collectionName}`
  );
  return result;
};

const aggregateDocuments = async (db, collectionName, pipeline) => {
  const collection = db.collection(collectionName);
  const result = await collection.aggregate(pipeline).toArray();
  console.log(`Aggregated ${result.length} document(s) in ${collectionName}`);
  return result;
};

module.exports = {
  insertDocument,
  findDocuments,
  deleteDocument,
  aggregateDocuments,
  updateDocument,
  findFly,
  deleteFly,
};
