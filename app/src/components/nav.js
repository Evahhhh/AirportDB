import React from "react";
import { Link } from "react-router-dom";
import "../style/components/nav.css";

export default function Nav() {
  return (
    <div className="component">
      <div className="logoPart">
        <img id="logo" src="/assets/logo.png" />
        <h1> AirportDB </h1>
      </div>
      <div className="navPart">
        <Link className="navBtn" to="/addairport">
          <button className="navBtnContent">Ajouter un aéroport</button>
        </Link>
        <Link className="navBtn" to="/addfly">
          <button className="navBtnContent">Ajouter un vol</button>
        </Link>
        <Link className="navBtn" to="/stats">
          <button className="navBtnContent">Statistiques</button>
        </Link>
      </div>
      <div className="flagPart">
        <Link to="/">
          <button className="flagBtn">
            <img id="flag" src="/assets/frFlag.png" />
          </button>
        </Link>
        <Link to="/viet">
          <button className="flagBtn">
            <img id="flag" src="/assets/vietFlag.png" />
          </button>
        </Link>
      </div>
    </div>
  );
}
