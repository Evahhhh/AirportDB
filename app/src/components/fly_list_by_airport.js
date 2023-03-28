import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import "../style/components/fly_list_by_airport.css";

export default function FlyListByAirport({ airport_code, wanted }) {
  const API_URL = "http://localhost:5150/api";
  const [allFly, setAllFly] = useState();
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const deleteFly = () => {
    console.log("suppression");
    
  };

  useEffect(() => {
    const response = axios
      .get(`${API_URL}/airport/fly?code_IATA=${airport_code}&wanted=${wanted}`)
      .then((response) => {
        console.log("réponse api : ", response.data);
        setAllFly(response.data);
      });
  }, []);

  return (
    <div className="container-fly">
      <div className="fly_list">
        {allFly &&
          allFly.map((fly, index) => (
            <div key={index} className="fly-item">
              <p className="title">Vol {fly.numero_vol}</p>
              {console.log(fly)}
              {wanted == "depart" && (
                <p>
                  Arrivera à : {fly.aeroport_arrivee.ville},{" "}
                  {fly.aeroport_arrivee.nom}{" "}
                </p>
              )}
              {wanted == "arrivee" && (
                <p>
                  Départ de : {fly.aeroport_depart.ville},{" "}
                  {fly.aeroport_depart.nom}{" "}
                </p>
              )}
              <p>
                Départ le :{" "}
                {format(new Date(fly.heure_depart), "dd/MM/yyyy HH:mm:ss")}{" "}
              </p>
              <p>
                Arrivée le :{" "}
                {format(new Date(fly.heure_arrivee), "dd/MM/yyyy HH:mm:ss")}{" "}
              </p>
              <p>Modèle de l'avion : {fly.avion.modele}</p>
              <p>Compagnie : {fly.avion.compagnie_aerienne}</p>
              <p>Capacité : {fly.avion.capacite}</p>
              <button onClick={handlePopup} className="btn-modif btn">
                Modifier le vol
              </button>
              {showPopup && (
                <div className="popup">
                  <div className="popup-content">
                    <p> Hello world</p>
                    <button onClick={handlePopup} className="btn-close btn">
                      Retour
                    </button>
                  </div>
                </div>
              )}
              <button onClick={() => deleteFly()} className="btn-supp btn">
                Supprimer l'aéroport
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
