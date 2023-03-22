import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

export default function Airport_list({ pays }) {
  // states
  const API_URL = "http://localhost:5150/api";
  const [data, setData] = useState();
  const [allAirport, setAllAirport] = useState();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

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
    <>
      <div className="airport_list_header">
        <p>{allAirport && allAirport.length} aéroports en {pays}</p>
      </div>

      <div className="airport_list">
        {data &&
          data.map((airport) => {
            return (
              <p key={airport._id}>
                {airport._id}: {airport.nom}
              </p>
            );
          })}
        {allAirport && (
          <Pagination
            count={Math.ceil(allAirport.length / limit)}
            page={page}
            onChange={(e, page) => handlePage(page)}
          />
        )}
      </div>
    </>
  );
}
