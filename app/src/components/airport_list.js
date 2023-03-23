import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import "../style/components/airport_list.css";
import { Link } from "react-router-dom";

export default function Airport_list({ pays }) {
  // states
  const [data, setData] = useState();
  const [allAirport, setAllAirport] = useState();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const API_URL="http://localhost:5150/api"

  const handlePage = (newPage) => {
    setPage(newPage);
    //méthode la liste
    const offset = (newPage - 1) * limit;
    const newLimit = offset + limit;
    const newData = allAirport.slice(offset, newLimit);
    setData(newData);
  };

  useEffect(() => {
    const response = axios
      .get(`${API_URL}/airport?pays=${pays}`)
      .then((response) => {
        setAllAirport(response.data);
      });
  }, []);

  useEffect(() => {
    const firstData = allAirport && allAirport.slice(0, limit);
    setData(firstData);
  }, [allAirport]);

  return (
    <div className="container">
      <div className="airport_list_header">
        <p className="bold">{allAirport && allAirport.length}</p>
        <p> aéroports en {pays}</p>
      </div>

      <div className="airport_list">
        {data &&
          data.map((airport) => {
            return (
              <Link className="link" to={`/planebyairport/${airport._id}`}>
                <div className="item">
                  <div key={airport._id} className="item_content">
                    <div>
                      <p className="bold">Code IATA :</p>
                      <p> {airport.code_IATA}</p>
                    </div>
                    <div>
                      <p className="bold">Aéroport :</p>
                      <p> {airport.nom}</p>
                    </div>
                    <div>
                      <p className="bold">Ville :</p>
                      <p> {airport.ville}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

        {allAirport && (
          <Pagination
            className="pagination"
            count={Math.ceil(allAirport.length / limit)}
            page={page}
            onChange={(e, page) => handlePage(page)}
          />
        )}
      </div>
    </div>
  );
}
