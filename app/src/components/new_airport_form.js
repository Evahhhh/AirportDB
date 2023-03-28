import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/components/form.css";

export default function NewAirportForm() {
  const [code, setCode] = useState();
  const [nom, setNom] = useState();
  const [ville, setVille] = useState();
  const [pays, setPays] = useState();
  const API_URL = "http://localhost:5150/api";
  const API_MAPS = "AIzaSyDszeQXLhCjjz14enAlH0rkx41Ry41XvsQ";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${ville}&key=${API_MAPS}`
      );

      const response = await axios.post(`${API_URL}/airport`, {
        code_IATA: code,
        nom,
        ville,
        pays,
        coordonnees_gps: {
          latitude: res.data.results[0].geometry.location.lat,
          longitude: res.data.results[0].geometry.location.lng,
        },
        vols: [],
      });
      if (response.data) {
        toast.success("Aéroport ajouté avec succès !");
      }
    } catch (error) {
      toast.error("Cet aéroport est déjà ajouté !");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <p className="title-form">Ajouter un aéroport</p>

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
          Ajouter
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
