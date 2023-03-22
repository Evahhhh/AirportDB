import React, { useState } from "react";
import Airport_list from "../components/airport_list";

// Lister tous les aéroports vietnamiens

export default function HomeViet() {
  return (
    <div>
      <div>
        <h1>Home VIET</h1>
        <Airport_list pays="Vietnam" />
      </div>
    </div>
  );
}
