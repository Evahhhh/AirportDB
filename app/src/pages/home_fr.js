import React, { useState } from "react";
import Airport_list from "../components/airport_list";

// Lister tous les aéroports français

export default function HomeFr() {
  return (
    <div>
      <div>
        <h1>Home FR</h1>
        <Airport_list pays="France" />
      </div>
    </div>
  );
}
