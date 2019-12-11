import * as React from 'react';
import Body from "./lib/Body";
import './App.css';


class App extends React.Component {
  public render() {
    return (
      <section>
        <div>
          <p>Header Here</p>
        </div>
        <Body/>
      </section>
    )
  }
}

export default App;
