import Episode from './Episode';
import React, {Component} from 'react';
import firebase from '../util/firebase';
import {strip} from '../util/helper';

// const ShowResult = (props) => {
//   if (props.episodes !== undefined) {
//     return (
//       <div className='episodes'>
//         <table>
//           <tr>
//             <th>Code</th>
//             <th>Name</th>
//             <th>Airdate</th>
//             <th>Writer</th>
//             <th>Summary</th>
//             <th>Location</th>
//           </tr>
//           {
//             props.episodes.map((key, index) =>
//               <Episode
//                 key={index}
//                 code={props.episodes[index].code}
//                 name={props.episodes[index].name}
//                 airdate={props.episodes[index].airdate}
//                 writer={props.episodes[index].writer}
//                 summary={props.episodes[index].summary}
//                 location={props.episodes[index].location}
//               />
//             )
//           }
//         </table>
//       </div>
//     );
//   } else {
//     return (
//       <div><h1>Empty!</h1></div>
//     )
//   }
// };

// function EpsiodeJacobHHHHHHH({ episode }) {
//   let hiddenSummary = true;
//   return <div
//     // onClick={() => hiddenSummary = !hiddenSummary}
//     onClick={(...args) => console.log(args)}
//     style={{border: '1px solid pink', margin: '1em'}}
//   >
//     <span>{episode.code} </span>
//     <span>{episode.name} </span>
//     <span>{episode.writer} </span>
//     <div hidden={hiddenSummary}>
//       <span>{episode.summary}</span>
//     </div>
//
//
//     {/*<Episode*/}
//     {/*key={index}*/}
//     {/*code={this.state.episodes[index].code}*/}
//     {/*name={this.state.episodes[index].name}*/}
//     {/*airdate={this.state.episodes[index].airdate}*/}
//     {/*writer={this.state.episodes[index].writer}*/}
//     {/*summary={this.state.episodes[index].summary}*/}
//     {/*location={this.state.episodes[index].location}*/}
//     {/*/>*/}
//   </div>
// }

class ShowResult extends Component {
  constructor(props) {
    super(props);

    // const showname = decodeURIComponent(props.location.pathname.replace('/', '').replace(/\+/g, '%20'));
    this.state = {
      // name: props.match.params.name,
      stripped: strip(props.location.pathname.split("/")[props.location.pathname.split("/").length -  1]),
      episodes: [],
    };
    document.title = 'Information';
  }

  render() {
    if (this.state.episodes.length === 0) {
      return (
        <div className='noepisodes'>
          <h1>
            No episodes.
          </h1>
        </div>
      );
    }

    return (
      <div className='episodes'>
        {
          this.state.episodes.map((episode, i) =>
            <Episode key={i} episode={episode}/>
          )
        }
      </div>
    );

    // return (
    //   <div className='episodes'>
    //     <table>
    //       <tr>
    //         <th>Code</th>
    //         <th>Name</th>
    //         <th>Airdate</th>
    //         <th>Writer</th>
    //         <th>Summary</th>
    //         <th>Location</th>
    //       </tr>
    //       {
    //         this.state.episodes.map((key, index) =>
    //           <Episode
    //             key={index}
    //             code={this.state.episodes[index].code}
    //             name={this.state.episodes[index].name}
    //             airdate={this.state.episodes[index].airdate}
    //             writer={this.state.episodes[index].writer}
    //             summary={this.state.episodes[index].summary}
    //             location={this.state.episodes[index].location}
    //           />
    //         )
    //       }
    //     </table>
    //   </div>
    // );
  }

  componentDidMount() {
    this.loadShowInformation().then((episodes) => {
      Object.keys(episodes.map((episode, index) => (
        this.setState({
          episodes: this.state.episodes.concat(episode)
        })
      )));
    });
  }

  async loadShowInformation() {
    const shows = await firebase.database().ref('shows').once('value');
    shows.forEach(child => {
      if (child.val()['Filename'] === this.state.stripped) {
        document.title = child.val()['Name'] + ' Information';
      }
    });

    const snapshot = await firebase.database().ref(this.state.stripped).once('value');

    const data = [];
    snapshot.forEach(child => {
      const episode = {
        // code: child.val()['Code'],
        code: child.val().Code,
        name: child.val().Name,
        airdate: child.val().Airdate,
        writer: child.val().Writer,
        summary: child.val().Summary,
        location: child.val().Location,
      };

      data.push(episode);
    });
    return data;
  }
}


export default ShowResult;