const insertDocument = async (db, collectionName, document) => {
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(document);
  console.log(
    `Inserted ${result.insertedCount} document(s) into ${collectionName}`
  );
  return result;
};

const findDocuments = async (db, collectionName, filter) => {
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
};
