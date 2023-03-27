import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import FlyListByAirport from "../components/fly_list_by_airport";
import "../style/plane_by_airport.css";

export default function PlaneByAirport() {
  const [, setPageIsMounted] = useState(false);
  const [airport, setAirport] = useState();
  const { id } = useParams();
  const API_URL = "http://localhost:5150/api";

  useEffect(() => {
    const response = axios
      .get(`${API_URL}/airportbyid?${id}`)
      .then((response) => {
        setAirport(response.data[0]);
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

    if (typeof airport === "undefined") {
      console.log("airport undefined");
    } else {
      const marker = new mapboxgl.Marker()
        .setLngLat([
          airport.coordonnees_gps.longitude,
          airport.coordonnees_gps.latitude,
        ])
        .addTo(map);

      map.flyTo({
        center: [
          airport.coordonnees_gps.longitude,
          airport.coordonnees_gps.latitude,
        ],
        zoom: 5,
      });
    }
  }, [airport]);
  return (
    <div className="plane-by-airport_container">
      <div className="airport-header">
        <div className="aiport-infos">
          <p className="IATA-airport">{airport && airport.code_IATA}</p>
          <p className="name-airport">{airport && airport.nom}</p>
          <p className="city-airport">Ville : {airport && airport.ville}</p>
        </div>
        <div id="my-map" style={{ height: "50vh", width: "50%" }} />
      </div>
      <>
        <button className="btn-modif">Modifier l'aéroport</button>
        <button className="btn-supp">Supprimer l'aéroport</button>
      </>
      <div className="plane-dp-arr">
        <div className="section">
          <p className="title-section">Départs</p>
          {airport && (
            <FlyListByAirport
              airport_code={airport.code_IATA}
              wanted="depart"
            />
          )}
        </div>
        <div className="section">
          <p className="title-section">Arrivées</p>
          {airport && (
            <FlyListByAirport
              airport_code={airport.code_IATA}
              wanted="arrivee"
            />
          )}
        </div>
      </div>
    </div>
  );
}
