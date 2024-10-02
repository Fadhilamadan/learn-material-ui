import React from "react";
import { Routes, Route } from "react-router-dom";

import DataGrid from "./components/DataGrid";
import DetailDataGrid from "./components/DetailDataGrid";
import Tabs from "./components/Tabs";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DataGrid />} />
      <Route path="/datagrid" element={<DataGrid />} />
      <Route path="/datagrid/:id" element={<DetailDataGrid />} />
      <Route path="/tabs" element={<Tabs />} />
    </Routes>
  );
};

export default App;
