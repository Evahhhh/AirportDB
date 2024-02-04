import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "../style/components/fly_list_by_airport.css";

export default function CardFly({
  fly,
  index,
  airport_code,
  wanted,
  airport_id,
}) {
  const API_URL = "https://airport-db-xd8l.vercel.app/api";
  const [showPopup, setShowPopup] = useState(false);

  const [numVol, setNumVol] = useState(fly.numero_vol);
  const [heureDep, setHeureDep] = useState(fly.heure_depart);
  const [heureArr, setHeureArr] = useState(fly.heure_arrivee);
  //aéroport départ
  const [paysDep, setPaysDep] = useState(fly.aeroport_depart.pays);
  const [airportDep, setAirportDep] = useState(fly.aeroport_depart.code_IATA);
  //aéroport arrivée
  const [paysArr, setPaysArr] = useState(fly.aeroport_arrivee.pays);
  const [airportArr, setAirportArr] = useState(fly.aeroport_arrivee.code_IATA);
  //avion
  const [modele, setModele] = useState(fly.avion.modele);
  const [capacite, setCapacite] = useState(fly.avion.capacite);
  const [compagnie, setCompagnie] = useState(fly.avion.compagnie_aerienne);

  const [airPortDepList, setAirPortDepList] = useState();
  const [airPortArrList, setAirPortArrList] = useState();

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // APPELER LE BACK POUR MODIFIER LE VOL AVEC LES INFOS A MODIFIER
    const response = await axios.put(`${API_URL}/airport/fly/${airport_code}`, {
        numVol,
        heureArr,
        heureDep,
        airportArr,
        airportDep,
        modele,
        capacite,
        compagnie,
    });
    if (response.data) {
      toast.success("Modifications enregistrées !");
      window.location.href = `/planebyairport/${airport_id}`;
    }
    try {
    } catch (error) {
      toast.error("Ce vol existe déjà !");
    }
  };

  const deleteFly = async () => {
    await axios
      .delete(`${API_URL}/airport/fly/${airport_code}/${fly.numero_vol}`)
      .then(() => {
        window.location.href = `/planebyairport/${airport_id}`;
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
      <div key={index} className="fly-item">
        <p className="title">Vol {fly.numero_vol}</p>

        {wanted == "depart" && (
          <p>
            Arrivera à : {fly.aeroport_arrivee.ville},{" "}
            {fly.aeroport_arrivee.nom}{" "}
          </p>
        )}
        {wanted == "arrivee" && (
          <p>
            Départ de : {fly.aeroport_depart.ville}, {fly.aeroport_depart.nom}{" "}
          </p>
        )}
        <p>
          Départ le :{" "}
          {format(new Date(fly.heure_depart), "dd/MM/yyyy HH:mm:ss")}{" "}
        </p>
        <p>
          Arrivée le :{" "}
          {format(new Date(fly.heure_arrivee), "dd/MM/yyyy HH:mm:ss")}{" "}
        </p>
        <p>Modèle de l'avion : {fly.avion.modele}</p>
        <p>Compagnie : {fly.avion.compagnie_aerienne}</p>
        <p>Capacité : {fly.avion.capacite}</p>
        <div className="btn-section">
          <button onClick={handlePopup} className="btn-modif btn">
            Modifier le vol
          </button>
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h1 className="title-form">Modifier le vol</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="cols-manage">
                    <div className="col1">
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
                              <option value="">
                                Veuillez sélectionner un aéroport
                              </option>
                              {Array.isArray(airPortDepList) &&
                                airPortDepList.map((arr) => {
                                  return (
                                    <option
                                      key={arr.code_IATA}
                                      value={arr.code_IATA}
                                    >
                                      {arr.nom}
                                    </option>
                                  );
                                })}
                            </select>
                          </label>
                        </div>
                      )}
                    </div>
                    <div className="col2">
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
                              <option value="">
                                Veuillez sélectionner un aéroport
                              </option>
                              {airPortArrList.map((arr) => {
                                return (
                                  <option
                                    key={arr.code_IATA}
                                    value={arr.code_IATA}
                                  >
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
                    </div>
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
          <button onClick={() => deleteFly()} className="btn-supp btn">
            Supprimer le vol
          </button>
        </div>
      </div>
    </>
  );
}
