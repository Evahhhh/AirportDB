import React, { useState } from "react";
import Airport_list from "../components/airport_list";

// Lister tous les aéroports français

export default function HomeFr() {
  return (
    <>
      <div>
        <Airport_list pays="France" />
      </div>
    </>
  );
}
