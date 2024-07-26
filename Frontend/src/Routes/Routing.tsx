import React from "react";
import Home from "../components/Home";
import Responsive from "../components/Responsive";
import { Routes, Route } from "react-router-dom";
function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Responsive" element={<Responsive/>} />
      </Routes>
    </div>
  );
}

export default Routing;
