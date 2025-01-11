import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Count from "./components/Count";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <h1>Redux Query Count App</h1>
        <Routes>
          <Route path="/" element={<Count />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
