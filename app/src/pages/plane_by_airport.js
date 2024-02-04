import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import FlyListByAirport from "../components/fly_list_by_airport";
import "../style/plane_by_airport.css";

export default function PlaneByAirport() {
  const [, setPageIsMounted] = useState(false);
  const [airport, setAirport] = useState();
  const { id } = useParams();
  const API_URL = "https://airport-db-xd8l.vercel.app/api";
  const API_MAPS = "AIzaSyDszeQXLhCjjz14enAlH0rkx41Ry41XvsQ";
  const [showPopup, setShowPopup] = useState(false);
  const [code, setCode] = useState();
  const [nom, setNom] = useState();
  const [ville, setVille] = useState();
  const [pays, setPays] = useState();

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const deleteDocuments = async (id) => {
    await axios.delete(`${API_URL}/documents/${id}`).then(() => {
      window.location.href = "/";
    });
  };

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${ville}&key=${API_MAPS}`
      );

      const response = await axios.put(`${API_URL}/documents/${id}`, {
        code_IATA: code,
        nom,
        ville,
        pays,
        location: {
          coordinates: [
            res.data.results[0].geometry.location.lng,
            res.data.results[0].geometry.location.lat,
          ],
        },
      });
      if (response.data) {
        toast.success("Modifications enregistrées !");
        window.location.href = `/planebyairport/${airport._id}`;
      }
    } catch (error) {
      toast.error("Cet aéroport existe déjà !");
    }
  };

  useEffect(() => {
    const response = axios
      .get(`${API_URL}/airportbyid?${id}`)
      .then((response) => {
        setAirport(response.data[0]);
        setCode(response.data[0].code_IATA);
        setNom(response.data[0].nom);
        setVille(response.data[0].ville);
        setPays(response.data[0].pays);
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
      new mapboxgl.Marker()
        .setLngLat(
          airport.location
            ? [airport.location.coordinates[0], airport.location.coordinates[1]]
            : [
                airport.coordonnees_gps.longitude,
                airport.coordonnees_gps.latitude,
              ]
        )
        .addTo(map);

      map.flyTo({
        center: airport.location
          ? [airport.location.coordinates[0], airport.location.coordinates[1]]
          : [
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
      <div className="buttons-section">
        <button onClick={handlePopup} className="btn-modif btn">
          Modifier l'aéroport
        </button>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h1 className="title-form">Modifier l'aéroport</h1>
              <form onSubmit={(e) => handleSubmit(e, airport._id)}>
                <div className="form-group">
                  <label className="form-label">
                    Code IATA :
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                      className="form-input"
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Nom de l'aéroport :
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      required
                      className="form-input"
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {/* Trouver le coordonnée en fonction du nom de la ville 
                    https://www.npmjs.com/package/node-geocoder
                    */}
                    Ville :
                    <input
                      type="text"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      required
                      className="form-input"
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <input
                      type="radio"
                      value="France"
                      checked={pays === "France"}
                      onChange={(e) => setPays(e.target.value)}
                      required
                      className="form-radio"
                    />
                    France
                  </label>
                  <label className="form-label">
                    <input
                      type="radio"
                      value="Vietnam"
                      checked={pays === "Vietnam"}
                      onChange={(e) => setPays(e.target.value)}
                      required
                      className="form-radio"
                    />
                    Vietnam
                  </label>
                </div>
                <button type="submit" className="form-button">
                  Modifier
                </button>
              </form>
              <button onClick={handlePopup} className="btn-close btn">
                Retour
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => deleteDocuments(airport._id)}
          className="btn-supp btn"
        >
          Supprimer l'aéroport
        </button>
      </div>
      <div className="plane-dp-arr">
        <div className="section">
          <p className="title-section">Départs</p>
          {airport && (
            <FlyListByAirport
              airport_code={airport.code_IATA}
              wanted="depart"
              airport_id={id}
            />
          )}
        </div>
        <div className="section">
          <p className="title-section">Arrivées</p>
          {airport && (
            <FlyListByAirport
              airport_code={airport.code_IATA}
              wanted="arrivee"
              airport_id={id}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
