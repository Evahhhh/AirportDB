import React from "react";
import NewAirportForm from "../components/new_airport_form";

export default function addAirport() {
//   const [insertedDoc, setInsertedDoc] = useState();
  const API_URL = "http://localhost:5150/api";

//   const insertDocument = async (newDoc) => {
//     const response = await axios.post(`${API_URL}/documents`, newDoc);
//     setInsertedDoc(response.data);
//   };

  return (
    <div>
      <NewAirportForm />
    </div>
  );
}
