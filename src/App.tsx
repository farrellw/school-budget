import * as React from "react";
import Body from "./lib/Body";
import Header from "./lib/Header";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Route path="*">
          <section>
            <Header />
            <Body />
          </section>
        </Route>
      </Router>
    );
  }
}

export default App;
