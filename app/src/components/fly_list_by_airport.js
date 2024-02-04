import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import CardFly from "./cardFly";

import "../style/components/fly_list_by_airport.css";

export default function FlyListByAirport({ airport_code, wanted, airport_id }) {
  const API_URL = "https://airport-db-xd8l.vercel.app/api";
  const [allFly, setAllFly] = useState();

  useEffect(() => {
    const response = axios
      .get(`${API_URL}/airport/fly?code_IATA=${airport_code}&wanted=${wanted}`)
      .then((response) => {
        setAllFly(response.data);
      });
  }, []);

  return (
    <div className="container-fly">
      <div className="fly_list">
        {allFly &&
          allFly.map((fly, index) => (
            <CardFly
              fly={fly}
              index={index}
              airport_code={airport_code}
              wanted={wanted}
              airport_id={airport_id}
            />
          ))}
      </div>
      <ToastContainer />
    </div>
  );
}
