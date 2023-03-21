import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style/index.css";
import Test from "./pages/test";
import HomeFr from "./pages/home_fr";
import HomeViet from "./pages/home_viet";
import Stats from "./pages/stats";
import AddFly from "./pages/add_fly";
import Nav from "./components/nav";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomeFr />} />
        <Route path="/viet" element={<HomeViet />} />
        <Route path="/test" element={<Test />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/addfly" element={<AddFly />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
