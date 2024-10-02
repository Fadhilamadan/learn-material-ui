import React from "react";
import { Routes, Route } from "react-router-dom";

import DataGridComponent from "./components/DataGridComponent";
import DetailDataGridComponent from "./components/DetailDataGridComponent";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DataGridComponent />} />
      <Route path="/details/:id" element={<DetailDataGridComponent />} />
    </Routes>
  );
};

export default App;
