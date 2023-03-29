import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/stats.css";

export default function Stats() {
  const API_URL = "http://localhost:5150/api";
  const [stats, setStats] = useState();
  const [airportArroundList, setAirportAroundList] = useState();
  const [airportArround, setAirportAround] = useState();
  const [companyList, setCompanyList] = useState();
  const [company, setCompany] = useState();
  const [capacity, setCapacity] = useState();

  useEffect(() => {
    axios
      .get(
        `${API_URL}/airport/stats?airportArround=${airportArround}&company=${company}&capacity=${capacity}`
      )
      .then((response) => {
        setStats(response.data);
      });
  }, [airportArround, company, capacity]);

  useEffect(() => {
    axios.get(`${API_URL}/airport`).then((response) => {
      setAirportAroundList(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/airport/company`).then((response) => {
      setCompanyList(response.data);
    });
  }, []);
  console.log({ stats });
  // airport => liste des aéroports a moins de 100km de l'aéroport sélectionner
  // airportCapacty => le nombre de vols qui ont une capacité supérieur à celle rentrée dans le champs
  // avgAirport => la moyenne des coordonnées
  // avgVol => Le nombre de vol au départ des aéroports
  // currentFlyCompany => Vol pour l'aéroport mis dans le champs
  return (
    <div className="page">
      <h1 className="center">Statistiques</h1>

      <div className="sections">
        <div className="section-airport single-section">
          <h3>Choisir un aéroport : </h3>
          <select
            className="input-stats"
            value={airportArround}
            onChange={(e) => setAirportAround(e.target.value)}
          >
            <option value="">Veuillez sélectionner un aéroport</option>
            {airportArroundList &&
              airportArroundList.map((airport) => {
                return <option value={airport._id}>{airport.nom}</option>;
              })}
          </select>
          {airportArround && (
            <p>
              Les aéroports situés à moins de 100 kms de l'aéroport sélectionné :
              {stats && stats.airport[0].code_IATA}
            </p>
          )}
        </div>

        <div className="section-compagny single-section">
          <h3>Choisir une compagnie aérienne : </h3>
          <select
            className="input-stats"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option value="">Veuillez sélectionner une compagnie</option>
            {companyList &&
              companyList.map((company) => {
                return <option value={company}>{company}</option>;
              })}
          </select>
          {company && (
            <p>
              Les vols opérés par la compagnie {company} pour tous les aéroports
              : {stats && stats.airport[0].code_IATA}
            </p>
            //APPEL
          )}
        </div>

        <div className="section-fly single-section">
          <h3>Choisir la capacité minimum : </h3>
          <input
            className="input-stats"
            value={capacity}
            placeholder="Capacité"
            type="number"
            min={0}
            onChange={(e) => {
              setCapacity(e.target.value);
            }}
          />
          {capacity && (
            <p>
              Les aéroports avec au moins un vol opéré par un avion ayant une
              capacité supérieure à {capacity} : {stats && stats.airport[0].code_IATA} 
            </p>

            //APPEL
          )}
        <div className="single-section">
          <p>Il y a {stats && stats.avgVol.totalVols} vols en tout.</p>
          <p>
            La moyenne de latitude et longitude des aéroports du Vietnam :
            {stats && stats.avgAirport.avgLatitude}
            {stats && stats.avgAirport.avgLongitude}
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
