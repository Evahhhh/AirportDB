import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style/index.css";
import Test from "./pages/test";
import HomeFr from "./pages/home_fr";
import HomeViet from "./pages/home_viet";
import Stats from "./pages/stats";
import AddFly from "./pages/add_fly";
import AddAirport from "./pages/add_airport";
import Nav from "./components/nav";
import PlaneByAirport from "./pages/plane_by_airport";

const App = () => {
  useEffect(() => {
    // Update title
    document.title = 'AirportDB';

    // Update favicon
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = '/assets/logo.png';
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomeFr />} />
          <Route path="/viet" element={<HomeViet />} />
          <Route path="/test" element={<Test />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/addfly" element={<AddFly />} />
          <Route path="/addairport" element={<AddAirport />} />
          <Route path="/planebyairport/:id" element={<PlaneByAirport />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);