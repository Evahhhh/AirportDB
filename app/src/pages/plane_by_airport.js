import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      // Create a new marker and add it to the map
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
    <div>
      <p>{airport && airport.code_IATA}</p>
      <p>{airport && airport.nom}</p>
      <p>{airport && airport.ville}</p>
      <div id="my-map" style={{ height: "50vh", width: "100%" }} />
    </div>
  );
}
