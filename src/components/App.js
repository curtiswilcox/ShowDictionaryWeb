import React from 'react';
import {Route, Switch} from 'react-router-dom';
// import logo from './logo.svg';
import '../styles/App.css';

// import firebase from './firebase.js';
import Home from './Home';
// import ShowIcon from './ShowIcon';
import ShowResult from "./ShowResult";


// class App extends Component {
function App(props) {
  return (
    <div>
      <Switch>
        <Route
          exact={true}
          path="/"
          render={(props) =>
            <Home
              {...props}
              // updateApp={(showname) => {
              // this.setState({
              //   chosenShow: showname,
              // chosenShowInfo: info,
              // });
              // }}
            />
          }
        />
        <Route
          path="/:name"
          render={(props) => {
            return (
              <ShowResult
                {...props}
                // showname={this.state.chosenShow}
                // episodes={this.state.chosenShowInfo}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
}

//   constructor(props) {
//     super(props);
//     // this.state = {
//     // chosenShow: "",
//     // chosenShowInfo: [],
//     // }
//   }
//
//   render() {
//     return (
//       <div>
//         <Switch>
//           <Route
//             exact={true}
//             path="/"
//             render={(props) =>
//               <Home
//                 {...props}
//                 // updateApp={(showname) => {
//                 // this.setState({
//                 //   chosenShow: showname,
//                 // chosenShowInfo: info,
//                 // });
//                 // }}
//               />
//             }
//           />
//           <Route
//             path="/:name"
//             render={(props) => {
//               return (
//                 <ShowResult
//                   {...props}
//                   // showname={this.state.chosenShow}
//                   // episodes={this.state.chosenShowInfo}
//                 />
//               );
//             }}
//           />
//         </Switch>
//       </div>
//     );
//
//     //         {/*<header className="App-header">*/}
//     //         {/*<img src={logo} className="App-logo" alt="logo"/>*/}
//     //         {/*<p>*/}
//     //         {/*Edit <code>src/App.js</code> and save to reload.*/}
//     //         {/*</p>*/}
//     //         {/*<a*/}
//     //         {/*className="App-link"*/}
//     //         {/*href="https://reactjs.org"*/}
//     //         {/*target="_blank"*/}
//     //         {/*rel="noopener noreferrer"*/}
//     //         {/*>*/}
//     //         {/*Learn React*/}
//     //         {/*</a>*/}
//     //         {/*</header>*/}
//   }
// }

export default App;