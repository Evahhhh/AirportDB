import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewAirportForm({ insertDocument }) {
  const [code, setCode] = useState();
  const [nom, setNom] = useState();
  const [ville, setVille] = useState();
  const [pays, setPays] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Aéroport ajouté avec succès !");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Code IATA :
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Nom de l'aéroport :
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Ville :
            <input
              type="text"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              value="France"
              checked={pays === "France"}
              onChange={(e) => setPays(e.target.value)}
              required
            />
            France
          </label>
          <label>
            <input
              type="radio"
              value="Vietnam"
              checked={pays === "Vietnam"}
              onChange={(e) => setPays(e.target.value)}
              required
            />
            Vietnam
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer/>
    </>
  );
}
