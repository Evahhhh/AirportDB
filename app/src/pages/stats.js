import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Stats() {
  const API_URL = "http://localhost:5150/api";
  const [stats, setStats] = useState();
  const [airportArroundList, setAirportAroundList] = useState();
  const [airportArround, setAirportAround] = useState();
  const [companyList, setCompanyList] = useState();
  const [company, setCompany] = useState();
  const [capacity, setCapacity] = useState();

  useEffect(() => {
    axios
      .get(
        `${API_URL}/airport/stats?airportArround=${airportArround}&company=${company}&capacity=${capacity}`
      )
      .then((response) => {
        setStats(response.data);
      });
  }, [airportArround, company, capacity]);

  useEffect(() => {
    axios.get(`${API_URL}/airport`).then((response) => {
      setAirportAroundList(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}/airport/company`).then((response) => {
      setCompanyList(response.data);
    });
  }, []);
  console.log({ stats });
  return (
    <div>
      <h1>Stats</h1>

      <select
        value={airportArround}
        onChange={(e) => setAirportAround(e.target.value)}
      >
        <option value="">Veuillez sélectionner un aéroport</option>
        {airportArroundList &&
          airportArroundList.map((airport) => {
            return <option value={airport._id}>{airport.nom}</option>;
          })}
      </select>

      <select value={company} onChange={(e) => setCompany(e.target.value)}>
        <option value="">Veuillez sélectionner une compagnie</option>
        {companyList &&
          companyList.map((company) => {
            return <option value={company}>{company}</option>;
          })}
      </select>

      <input
        value={capacity}
        placeholder="Entrez votre capacité souhaitez"
        type="number"
        min={0}
        onChange={(e) => {
          setCapacity(e.target.value);
        }}
      />
    </div>
  );
}
