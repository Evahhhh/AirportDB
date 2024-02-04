import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/stats.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Stats() {
  const API_URL = "https://airport-db-xd8l.vercel.app/api";
  const [, setPageIsMounted] = useState(false);
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

  useEffect(() => {
    setPageIsMounted(true);
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFydGgxIiwiYSI6ImNreWJidHk4cTA3NXIycG10a3ZzaDFia3MifQ.XxoFzhzTP0vgPaB1mM4i8g";
    const map = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [42, 3],
      zoom: 10,
    });

    if (typeof stats === "undefined") {
      console.log("stats undefined");
    } else if (
      typeof stats.avgAirport.avgLongitude !== "number" ||
      isNaN(stats.avgAirport.avgLongitude) ||
      typeof stats.avgAirport.avgLatitude !== "number" ||
      isNaN(stats.avgAirport.avgLatitude)
    ) {
      console.log("Invalid longitude or latitude value");
    } else {
      new mapboxgl.Marker()
        .setLngLat([stats.avgAirport.avgLongitude, stats.avgAirport.avgLatitude])
        .addTo(map);

      map.flyTo({
        center: [stats.avgAirport.avgLongitude, stats.avgAirport.avgLatitude],
        zoom: 5,
      });
    }
  }, [stats]);
  console.log({ stats });
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
              Les aéroports situés à moins de 100 kms de l'aéroport sélectionné
              :
              {stats &&
                stats.airport &&
                stats.airport.map((airport) => {
                  return <li>{airport.code_IATA}</li>;
                })}
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
              :{" "}
              {stats &&
                stats.currentFlyCompany &&
                stats.currentFlyCompany.map((fly) => {
                  return (
                    <ul class="flight-info">
                      <li>
                        <div class="bold"> Vol {fly.numero_vol} </div>
                        <ul class="departure-info">
                          <li>
                            Aéroport de départ : {fly.aeroport_depart.code_IATA}
                            , {fly.aeroport_depart.nom} en{" "}
                            {fly.aeroport_depart.pays}
                          </li>
                        </ul>
                        <ul class="arrival-info">
                          <li>
                            Aéroport d'arrivée :{" "}
                            {fly.aeroport_arrivee.code_IATA},{" "}
                            {fly.aeroport_arrivee.nom} en{" "}
                            {fly.aeroport_arrivee.pays}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  );
                })}
            </p>
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
            <p class="airport-capacity">
              Les aéroports avec au moins un vol opéré par un avion ayant une
              capacité supérieure à {capacity} :
              <span class="airport-codes">
                {stats &&
                  stats.airportCapacity.map((el) => el.code_IATA).join(",")}
              </span>
            </p>
          )}
          <div className="single-section">
            <p>
              Il y a {stats && stats.avgVol && stats.avgVol.totalVols} vols en
              tout.
            </p>
            <p>
              La moyenne de latitude et longitude des aéroports du Vietnam :
              {stats && stats.avgAirport && stats.avgAirport.avgLatitude},{" "}
              {stats && stats.avgAirport && stats.avgAirport.avgLongitude}
            </p>
            <div id="my-map" className="center" style={{ height: "50vh", width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
