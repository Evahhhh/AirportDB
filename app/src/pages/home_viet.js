import React, { useState } from "react";
import Airport_list from "../components/airport_list";

// Lister tous les aéroports vietnamiens

export default function HomeViet() {
  return (
    <>
      <div>
        <Airport_list pays="Vietnam" />
      </div>
    </>
  );
}
