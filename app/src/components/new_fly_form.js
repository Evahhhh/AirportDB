import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//formulaire
export default function NewFlyForm({insertDocument}) {
  const [numVol, setNumVol] = useState();
  const [heureDep, setHeureDep] = useState();
  const [heureArr, setHeureArr] = useState();
  //aéroport départ
  const [paysDep, setPaysDep] = useState();
  const [villeDep, setVilleDep] = useState();
  const [airportDep, setAirportDep] = useState();
  //aéroport arrivée
  const [paysArr, setPaysArr] = useState();
  const [villeArr, setVilleArr] = useState();
  const [airportArr, setAirportArr] = useState();
  //avion
  const [modele, setModele] = useState();
  const [capacite, setCapacite] = useState();
  const [compagnie, setCompagnie] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
      // insertDocument(
      //   {
      //     numVol: numVol,
      //     heureDep: heureDep,
      //     heureArr: heureArr,
      //     paysDep: paysDep,
      //     villeDep: villeDep,
      //     airportDep: airportDep,
      //     paysArr: paysArr,
      //     villeArr: villeArr,
      //     airportArr: airportArr,
      //     modele: modele,
      //     capacite: capacite,
      //     compagnie: compagnie,
      //   }
      // )
    toast.success("Vol ajouté avec succès !");
  };
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

        <div>
          <label>
            Ville :
            <select
              value={villeDep}
              onChange={(e) => setVilleDep(e.target.value)}
              required
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Nom de l'aéroport :
            <select
              value={airportDep}
              onChange={(e) => setAirportDep(e.target.value)}
              required
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
        </div>


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

        <div>
          <label>
            Ville :
            <select
              value={villeArr}
              onChange={(e) => setVilleArr(e.target.value)}
              required
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Nom de l'aéroport :
            <select
              value={airportArr}
              onChange={(e) => setAirportArr(e.target.value)}
              required
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </label>
        </div>

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
