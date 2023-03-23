const connect = require("./db");
const { findDocuments, insertDocument, updateDocument, deleteDocument, aggregateDocuments } = require("./services/common");

app.get("/api/documents", async (req, res) => {
  try {
    const db = await connect();
    const documents = await findDocuments(db, "documents", {});
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/documents", async (req, res) => {
  try {
    const db = await connect();
    const document = req.body;
    const result = await insertDocument(db, "documents", document);
    res.json(result.ops[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/api/documents/:id", async (req, res) => {
  try {
    const db = await connect();
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const update = req.body;
    const result = await updateDocument(db, "documents", filter, update);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.delete("/api/documents/:id", async (req, res) => {
  try {
    const db = await connect();
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const result = await deleteDocument(db, "documents", filter);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/documents/aggregate", async (req, res) => {
  try {
    const db = await connect();
    const pipeline = req.body;
    const result = await aggregateDocuments(db, "documents", pipeline);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
