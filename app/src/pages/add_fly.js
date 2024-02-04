import React, { useState } from "react";
import NewFlyForm from "../components/new_fly_form";
import axios from "axios";

export default function AddFly() {
  const [insertedDoc, setInsertedDoc] = useState();
  const API_URL = "https://airport-db-xd8l.vercel.app/api";

  const insertDocument = async (newDoc) => {
    const response = await axios.post(`${API_URL}/documents`, newDoc);
    setInsertedDoc(response.data);
  };

  return (
    <>
      <NewFlyForm insertDocument={insertDocument} />
    </>
  );
}
