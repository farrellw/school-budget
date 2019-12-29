import React from "react";
import Body from "./lib/Body";
import Header from "./lib/Header";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="*">
        <section>
          <Header schools={[]} />
          <Body />
        </section>
      </Route>
    </Router>
  );
}

export default App;
