import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import routes from "./route-config";
import Login from "./auth/Login";
import Authorized from "./auth/Authorized";
import PostModal from "./Posts/PostModal";

function App() {
  return (
    <BrowserRouter>
      <Menu></Menu>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
