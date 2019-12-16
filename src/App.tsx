import * as React from 'react';
import Body from "./lib/Body";
import Header from "./lib/Header";
import './App.css';


class App extends React.Component {
  public render() {
    return (
      <section>
        <Header/>
        <Body/>
      </section>
    )
  }
}

export default App;
