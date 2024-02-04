import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/components/form.css";
//formulaire
export default function NewFlyForm({ insertDocument }) {
  const API_URL = "https://airport-db-xd8l.vercel.app/api";
  const [numVol, setNumVol] = useState("");
  const [heureDep, setHeureDep] = useState();
  const [heureArr, setHeureArr] = useState();
  //aéroport départ
  const [paysDep, setPaysDep] = useState("");
  const [airportDep, setAirportDep] = useState("");
  //aéroport arrivée
  const [paysArr, setPaysArr] = useState("");
  const [airportArr, setAirportArr] = useState("");
  //avion
  const [modele, setModele] = useState("");
  const [capacite, setCapacite] = useState("");
  const [compagnie, setCompagnie] = useState("");

  const [airPortDepList, setAirPortDepList] = useState();
  const [airPortArrList, setAirPortArrList] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/airport/fly`, {
        numVol,
        heureArr,
        heureDep,
        airportArr,
        airportDep,
        modele,
        capacite,
        compagnie,
      })
      .then((response) => {
        toast.success("Vol ajouté avec succès !");
      });
  };

  useEffect(() => {
    if (heureDep >= heureArr) {
      toast.error("La date d'arrivée doit être supérieure à celle de départ");
    }
  }, [heureDep, heureArr]);

  useEffect(() => {
    axios.get(`${API_URL}/airport?pays=${paysDep}`).then((response) => {
      setAirPortDepList(response.data);
    });

    axios.get(`${API_URL}/airport?pays=${paysArr}`).then((response) => {
      setAirPortArrList(response.data);
    });
  }, [paysArr, paysDep]);

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <p className="title-form">Ajouter un vol</p>
        <div className="form-group">
          <label className="form-label">
            Numéro de vol :
            <input
              type="text"
              value={numVol}
              onChange={(e) => setNumVol(e.target.value)}
              required
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Heure de départ :
            <input
              type="datetime-local"
              value={heureDep}
              onChange={(e) => setHeureDep(e.target.value)}
              required
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Heure d'arrivée :
            <input
              type="datetime-local"
              value={heureArr}
              onChange={(e) => setHeureArr(e.target.value)}
              required
              className="form-input"
            />
          </label>
        </div>

        <p>Aéroport de départ</p>

        <div className="form-group">
          <label className="form-label">
            <input
              type="radio"
              value="France"
              checked={paysDep === "France"}
              onChange={(e) => setPaysDep(e.target.value)}
              required
              className="form-radio"
            />
            France
          </label>
          <label className="form-label">
            <input
              type="radio"
              value="Vietnam"
              checked={paysDep === "Vietnam"}
              onChange={(e) => setPaysDep(e.target.value)}
              required
              className="form-radio"
            />
            Vietnam
          </label>
        </div>

        {paysDep && (
          <div className="form-group">
            <label className="form-label">
              Nom de l'aéroport :
              <select
                value={airportDep}
                onChange={(e) => setAirportDep(e.target.value)}
                required
                className="form-select"
              >
                <option value="">Veuillez sélectionner un aéroport</option>
                {Array.isArray(airPortDepList) &&
                  airPortDepList.map((arr) => {
                    return (
                      <option key={arr.code_IATA} value={arr.code_IATA}>
                        {arr.nom}
                      </option>
                    );
                  })}
              </select>
            </label>
          </div>
        )}

        <p>Aéroport d'arrivée</p>

        <div className="form-group">
          <label className="form-label">
            <input
              type="radio"
              value="France"
              checked={paysArr === "France"}
              onChange={(e) => setPaysArr(e.target.value)}
              required
              className="form-radio"
            />
            France
          </label>
          <label className="form-label">
            <input
              type="radio"
              value="Vietnam"
              checked={paysArr === "Vietnam"}
              onChange={(e) => setPaysArr(e.target.value)}
              required
              className="form-radio"
            />
            Vietnam
          </label>
        </div>

        {paysArr && (
          <div className="form-group">
            <label className="form-label">
              Nom de l'aéroport :
              <select
                value={airportArr}
                onChange={(e) => setAirportArr(e.target.value)}
                required
                className="form-select"
              >
                <option value="">Veuillez sélectionner un aéroport</option>
                {airPortArrList.map((arr) => {
                  return (
                    <option key={arr.code_IATA} value={arr.code_IATA}>
                      {arr.nom}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        )}

        <p className="little-title-form">Avion</p>

        <div className="form-group">
          <label className="form-label">
            Modèle :
            <input
              type="text"
              value={modele}
              onChange={(e) => setModele(e.target.value)}
              required
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Capacité :
            <input
              type="number"
              value={capacite}
              onChange={(e) => setCapacite(e.target.value)}
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            Compagnie :
            <input
              type="text"
              value={compagnie}
              onChange={(e) => setCompagnie(e.target.value)}
              required
              className="form-input"
            />
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
