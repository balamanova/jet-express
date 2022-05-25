import React from "react";
import './App.css';
import "antd/dist/antd.min.css";
import {MapGL} from './map/MapGL'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import ProductPage from "./folder/ProductPage";
import Admin from "./admin/Admin";

function App() {
  return (
         <Router>
                  <Routes>

                      <Route path="/" element={<Login/>} />
                      <Route path="/product" element={<ProductPage/>} />
                      <Route path="/map" element={<MapGL/>} />
                      <Route path="/admin" element={<Admin/>} />
                      {/*<Route path="/home" exact component={Home} />*/}
                      {/*<AuthenticatedRoute path="/client" exact component={ClientHome} />*/}
                  </Routes>
              </Router>
  );
}

export default App;
