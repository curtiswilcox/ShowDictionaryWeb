import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
// import logo from './logo.svg';
import '../styles/App.css';

import Home from './Home';
import ShowResult from './ShowResult';

import {strip} from '../util/helper';


// class App extends Component {
function App(props) {
  return (
    <div>
      <Switch>
        <Route
          exact={true}
          path='/ShowDictionary/'
          render={(props) =>
            <Home{...props}/>
          }
        />
        <Route
          path='/ShowDictionary/:name'
          render={(props) => {
            return (
              <ShowResult{...props}/>
            );
          }}
        />
        <Route
          path="/:name"
          render={(props) => (
            <Redirect to={"/ShowDictionary/" + strip(props.location.pathname)}/>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
