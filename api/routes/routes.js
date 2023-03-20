const connect = require("../db");
var express = require("express");
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
    const db = await connect();
    const documents = await findDocuments(db, "documents", {});
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.post("/api/documents", async (req, res) => {
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

router.put("/api/documents/:id", async (req, res) => {
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

router.delete("/api/documents/:id", async (req, res) => {
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

router.post("/api/documents/aggregate", async (req, res) => {
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

router.get("/", async (req, res) => {
  res.send("Hello World");
});

module.exports = router;

// APPEL ROUTES REACT
// import axios from 'axios';

// const API_URL = 'http://localhost:3000/api';

// export const getDocuments = async () => {
//   const response = await axios.get(`${API_URL}/documents`);
//   return response.data;
// };

// export const getDocument = async (id) => {
//   const response = await axios.get(`${API_URL}/documents/${id}`);
//   return response.data;
// };

// export const createDocument = async (document) => {
//   const response = await axios.post(`${API_URL}/documents`, document);
//   return response.data;
// };

// export const updateDocument = async (id, document) => {
//   const response = await axios.put(`${API_URL}/documents/${id}`, document);
//   return response.data;
// };

// export const deleteDocument = async (id) => {
//   const response = await axios.delete(`${API_URL}/documents/${id}`);
//   return response.data;
// };

// export const aggregateDocuments = async (pipeline) => {
//   const response = await axios.post(`${API_URL}/documents/aggregate`, pipeline);
//   return response.data;
// };
