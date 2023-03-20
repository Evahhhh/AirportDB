import React, { useState } from "react";
import axios from "axios";

export default function Test() {
  const [allDocs, setAllDocs] = useState();
  const [insertedDoc, setInsertedDoc] = useState();
  const API_URL = "http://localhost:5150/api";

  const getDocuments = async () => {
    console.log("test : getDocuments : appel");
    const response = await axios.get(`${API_URL}/documents`);
    console.log("test : getDocuments : axios");
    setAllDocs(response.data);
    console.log("test : getDocuments : setAllDocs");
    return response.data;
  };

  var newDoc = 
  {
    "code_IATA": "CDG",
    "nom": "Aéroport Charles de Gaulle",
    "ville": "Paris",
    "pays": "France",
    "vols": [
      {
        "numero_vol": "AF123",
        "heure_depart": new Date("2023-03-21T10:00:00Z"),
        "heure_arrivee": new Date("2023-03-21T12:30:00Z"),
        "aeroport_depart": {
          "code_IATA": "CDG",
          "nom": "Aéroport Charles de Gaulle",
          "ville": "Paris",
          "pays": "France"
        },
        "aeroport_arrivee": {
          "code_IATA": "HUE",
          "nom": "Aéroport Hue",
          "ville": "Hue",
          "pays": "Vietnam"
        },
        "avion": {
          "modele": "Airbus A380",
          "capacite": 853,
          "compagnie_aerienne": "Vietnam airline"
        }
      }
    ]
  };

  const insertDocument = async (newDoc) => {
    console.log("test : insertDocument : appel");
    const response = await axios.post(`${API_URL}/documents`, newDoc);
    console.log("test : insertDocument : axios");
    setInsertedDoc(response.data);
    console.log("test : insertDocument : setInserted");
    return response.data;
  };

  return (
    <>
      <div>
        <h1>Test</h1>
      </div>
      <div>
        {/* ajouter un doc */}
        <button onClick={() => insertDocument(newDoc)}>Inréer les documents</button>
        {insertedDoc}
        {/* afficher tous les docs */}
        <button onClick={() => getDocuments()}>Voir les documents</button>
        {allDocs}
      </div>
    </>
  );
}
