import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" name="Home" render={props => <Dashboard {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
