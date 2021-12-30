import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { TodoList } from './pages/TodoList';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/todolist" component={TodoList} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/" component={Login} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
