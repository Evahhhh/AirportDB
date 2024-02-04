import axios from "axios";
import React, { useState } from "react";
import { newDoc, upDoc } from "../mock_data";

export default function Test() {
  const [allDocs, setAllDocs] = useState();
  const [insertedDoc, setInsertedDoc] = useState();
  const API_URL = "https://airport-db-xd8l.vercel.app/api";

  const getDocuments = async () => {
    const response = await axios.get(`${API_URL}/documents`);
    setAllDocs(response.data);
  };

  const insertDocument = async (newDoc) => {
    const response = await axios.post(`${API_URL}/documents`, newDoc);
    setInsertedDoc(response.data);
  };

  const deleteDocuments = async (id) => {
    await axios.delete(`${API_URL}/documents/${id}`);
  };

  const updateDocuments = async (id) => {
    await axios.put(`${API_URL}/documents/${id}`, upDoc);
  };

  return (
    <>
      <div>
        <h1>Test</h1>
      </div>
      <div>
        {/* ajouter un doc */}
        <button onClick={() => insertDocument(newDoc)}>
          Inréer les documents
        </button>
        {insertedDoc && insertedDoc.insertedId}
        <button onClick={() => getDocuments()}>Voir les documents</button>

        <br />

        {/* afficher tous les docs */}
        {allDocs &&
          allDocs.map((doc) => {
            return (
              <p>
                {doc._id}: {doc.nom}
                <button onClick={() => deleteDocuments(doc._id)}>
                  Supprimer le document
                </button>
                <button onClick={() => updateDocuments(doc._id)}>
                  Modifier le document
                </button>
              </p>
            );
          })}
      </div>
    </>
  );
}
