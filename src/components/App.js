import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
// import logo from './logo.svg';
import '../styles/App.css';

import Home from './Home';
import ShowResult from './ShowResult';

import  {strip} from '../util/helper';


// class App extends Component {
function App(props) {
  return (
    <div>
      <Switch>
        <Route
          exact={true}
          path='/show-dictionary/'
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
          path='/show-dictionary/:name'
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
        <Route
          path="/:name"
          render={(props) => (
            <Redirect to={"/show-dictionary" + strip(props.location.pathname)}/>
          )}
        />
      </Switch>
    </div>
  );
}

//   constructor(props) {
//     super(props);
//     // this.state = {
//     // chosenShow: '',
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
//             path='/'
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
//             path='/:name'
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
//     //         {/*<header className='App-header'>*/}
//     //         {/*<img src={logo} className='App-logo' alt='logo'/>*/}
//     //         {/*<p>*/}
//     //         {/*Edit <code>src/App.js</code> and save to reload.*/}
//     //         {/*</p>*/}
//     //         {/*<a*/}
//     //         {/*className='App-link'*/}
//     //         {/*href='https://reactjs.org'*/}
//     //         {/*target='_blank'*/}
//     //         {/*rel='noopener noreferrer'*/}
//     //         {/*>*/}
//     //         {/*Learn React*/}
//     //         {/*</a>*/}
//     //         {/*</header>*/}
//   }
// }

export default App;