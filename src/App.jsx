import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import HomePage from './pages/HomePages'
import Page404 from './pages/Page404'


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/' component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
