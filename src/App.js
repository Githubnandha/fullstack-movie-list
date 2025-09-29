import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import MoviesList from "./components/MoviesList";
import MoviesById from "./components/MoviesById";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MoviesList} />
          <Route path="/api/movies/:id" component={MoviesById}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
