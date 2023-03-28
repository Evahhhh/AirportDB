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
  findFly,
} = require("../services/common");


router.get("/", async (req, res) => {
  try {
    const documents = await findDocuments(db, "airport", {});
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/", async (req, res) => {
  try {
    const document = req.body;
    const result = await insertDocument(db, "airport", document);
    res.json(result);
  } catch (err) {
    console.error("err", err);
    res.status(500).json({ error: "An error occurred" });
}
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

router.post("/aggregate", async (req, res) => {
  try {
    const pipeline = req.body;
    const result = await aggregateDocuments(db, "airport", pipeline);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});


module.exports = router;