import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar";
import ItemList from "./components/itemlist";
import AddItemForm from "./components/addItemForm";
import Details from "./components/details";
import Footer from "./components/footer";
import "./App.css";

export default function App() {
  return (
    <div>
      <NavBar className="nav" />
      <div className="container">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div className="items">
                  <ItemList />
                </div>
              }
            />
            <Route path="/items/:UserId" element={<Details />} />
            <Route
              path="/addItem"
              element={
                <div className="items">
                  <AddItemForm />
                </div>
              }
            />
            <Route
              path="*"
              element={
                <div>
                  <h2>404 Page not found etc</h2>
                </div>
              }
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}
