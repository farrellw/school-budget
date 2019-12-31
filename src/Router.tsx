import * as React from "react";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Route path="*">
        <App />
      </Route>
    </BrowserRouter>
  );
}

export default Router;
