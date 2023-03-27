import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/components/form.css";

export default function NewAirportForm({ insertDocument }) {
  const [code, setCode] = useState();
  const [nom, setNom] = useState();
  const [ville, setVille] = useState();
  const [pays, setPays] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Aéroport ajouté avec succès !");
  };

  //ATTENTION : VERIFIER SI LE CODE IATA EXISTE DEJA EN RECUPERANT TOUS LES IATA EXISTANTS REFUSER LE FORMULAIRE SINON

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
          Submit
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
