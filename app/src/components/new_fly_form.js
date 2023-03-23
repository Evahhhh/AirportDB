import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//formulaire
export default function NewFlyForm({ insertDocument }) {
  const API_URL = "http://localhost:5150/api";
  const [numVol, setNumVol] = useState();
  const [heureDep, setHeureDep] = useState();
  const [heureArr, setHeureArr] = useState();
  //aéroport départ
  const [paysDep, setPaysDep] = useState();
  const [airportDep, setAirportDep] = useState();
  //aéroport arrivée
  const [paysArr, setPaysArr] = useState();
  const [airportArr, setAirportArr] = useState();
  //avion
  const [modele, setModele] = useState();
  const [capacite, setCapacite] = useState();
  const [compagnie, setCompagnie] = useState();

  const [airPortDepList, setAirPortDepList] = useState();
  const [airPortArrList, setAirPortArrList] = useState();

  // TANT QUE CANADD EST PAS A TRTUE ON AJOUTE RIEN
  const [canAdd, setCanAdd] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/airport`, {
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
        setAirPortDepList(response.data);
        toast.success("Vol ajouté avec succès !");
      });
  };

  useEffect(() => {
    if(heureDep >= heureArr){
      console.log("heure de départ supérieure à l'heure d'arrivée");
      toast.error("La date d'arrivée doit être supérieure à celle de départ")
    }else{
      setCanAdd(true);
    }
  },[heureDep, heureArr]);

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
      <h1>NewFlyForm</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Numéro de vol :
            <input
              type="text"
              value={numVol}
              onChange={(e) => setNumVol(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Heure de départ :
            <input
              type="datetime-local"
              value={heureDep}
              onChange={(e) => setHeureDep(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Heure d'arrivée :
            <input
              type="datetime-local"
              value={heureArr}
              onChange={(e) => setHeureArr(e.target.value)}
              required
            />
          </label>
        </div>

        <p>Aéroport de départ</p>

        <div>
          <label>
            <input
              type="radio"
              value="France"
              checked={paysDep === "France"}
              onChange={(e) => setPaysDep(e.target.value)}
              required
            />
            France
          </label>
          <label>
            <input
              type="radio"
              value="Vietnam"
              checked={paysDep === "Vietnam"}
              onChange={(e) => setPaysDep(e.target.value)}
              required
            />
            Vietnam
          </label>
        </div>

        {paysDep && (
          <div>
            <label>
              Nom de l'aéroport :
              <select
                value={airportDep}
                onChange={(e) => setAirportDep(e.target.value)}
                required
              >
                <option value="">
                  <i>Veuillez sélectionner une aéroport</i>
                </option>
                {airPortDepList.map((arr) => {
                  return <option value={arr.code_IATA}>{arr.nom}</option>;
                })}
              </select>
            </label>
          </div>
        )}

        <p>Aéroport d'arrivée</p>

        <div>
          <label>
            <input
              type="radio"
              value="France"
              checked={paysArr === "France"}
              onChange={(e) => setPaysArr(e.target.value)}
              required
            />
            France
          </label>
          <label>
            <input
              type="radio"
              value="Vietnam"
              checked={paysArr === "Vietnam"}
              onChange={(e) => setPaysArr(e.target.value)}
              required
            />
            Vietnam
          </label>
        </div>

        {paysArr && (
          <div>
            <label>
              Nom de l'aéroport :
              <select
                value={airportArr}
                onChange={(e) => setAirportArr(e.target.value)}
                required
              >
                <option value="">
                  <i>Veuillez sélectionner une aéroport</i>
                </option>
                {airPortArrList.map((arr) => {
                  return <option value={arr.code_IATA}>{arr.nom}</option>;
                })}
              </select>
            </label>
          </div>
        )}

        <p>Avion</p>

        <div>
          <label>
            Modèle :
            <input
              type="text"
              value={modele}
              onChange={(e) => setModele(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Capacité :
            <input
              type="number"
              value={capacite}
              onChange={(e) => setCapacite(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Compagnie :
            <input
              type="text"
              value={compagnie}
              onChange={(e) => setCompagnie(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </>
  );
}
