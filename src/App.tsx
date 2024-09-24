import React from "react";
import { Routes, Route } from "react-router-dom";

import DataGridComponent from "./components/DataGridComponent";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DataGridComponent />} />
    </Routes>
  );
};

export default App;
