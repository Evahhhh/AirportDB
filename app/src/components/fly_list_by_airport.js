import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import "../style/components/fly_list_by_airport.css";

export default function FlyListByAirport({ airport_code, wanted }) {
  const API_URL = "http://localhost:5150/api";
  const [allFly, setAllFly] = useState();

  useEffect(() => {
    const response = axios
      .get(
        `${API_URL}/airport/fly?vols.aeroport_${wanted}.code_IATA=${airport_code}`
      )
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
              <p>
                Départ le : {format(new Date(fly.heure_depart), "dd/MM/yyyy HH:mm:ss")}{" "}
              </p>
              <p>
                Arrivée le : {format(new Date(fly.heure_arrivee), "dd/MM/yyyy HH:mm:ss")}{" "}
              </p>
              <p>Modèle de l'avion : {fly.avion.modele}</p>
              <p>Compagnie : {fly.avion.compagnie_aerienne}</p>
              <p>Capacité : {fly.avion.capacite}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
