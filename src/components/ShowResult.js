import Episode from "./Episode";
import React, {Component} from 'react';
import firebase from "./firebase";
import {strip} from "../util/episode";

// const ShowResult = (props) => {
//   if (props.episodes !== undefined) {
//     return (
//       <div className="episodes">
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

class EpisodeJacob extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      summaryVisible: false,
    }
  }

  toggleSummaryVisible = () => this.setState(prevState =>
    ({ summaryVisible: !prevState.summaryVisible })
  )

  render() {

    const {episode} = this.props

    return <div
      onClick={this.toggleSummaryVisible}
      style={{border: '1px solid pink', margin: '1em'}}
    >
      <span>{episode.code}</span>
      <span>{episode.name}</span>
      <span>{episode.writer}</span>
      <div hidden={!this.state.summaryVisible}>
        <span>{episode.summary}</span>
      </div>
    </div>


  }
}

function EpsiodeJacobHHHHHHH({ episode }) {
  let hiddenSummary = true;
  return <div
    // onClick={() => hiddenSummary = !hiddenSummary}
    onClick={(...args) => console.log(args)}
    style={{border: '1px solid pink', margin: '1em'}}
  >
    <span>{episode.code} </span>
    <span>{episode.name} </span>
    <span>{episode.writer} </span>
    <div hidden={hiddenSummary}>
      <span>{episode.summary}</span>
    </div>


    {/*<Episode*/}
    {/*key={index}*/}
    {/*code={this.state.episodes[index].code}*/}
    {/*name={this.state.episodes[index].name}*/}
    {/*airdate={this.state.episodes[index].airdate}*/}
    {/*writer={this.state.episodes[index].writer}*/}
    {/*summary={this.state.episodes[index].summary}*/}
    {/*location={this.state.episodes[index].location}*/}
    {/*/>*/}
  </div>
}

class ShowResult extends Component {
  constructor(props) {
    super(props);

    const showname = decodeURIComponent(props.location.pathname.replace("/", "").replace(/\+/g, "%20"));

    console.log(props);
    this.state = {
      // name: props.match.params.name,
      stripped: strip(showname),
      episodes: []
    };
    document.title = showname + " Information";
  }

  render() {
    if (this.state.episodes.length === 0) {
      return (
        <div className="noepisodes">
          <h1>
            No episodes.
          </h1>
        </div>
      );
    }

    return (
      <div className="episodes">
        {
          this.state.episodes.map((episode, i) =>



            <div key={i}>
              <EpisodeJacob episode={episode}/>


              {/*<Episode*/}
              {/*key={index}*/}
              {/*code={this.state.episodes[index].code}*/}
              {/*name={this.state.episodes[index].name}*/}
              {/*airdate={this.state.episodes[index].airdate}*/}
              {/*writer={this.state.episodes[index].writer}*/}
              {/*summary={this.state.episodes[index].summary}*/}
              {/*location={this.state.episodes[index].location}*/}
              {/*/>*/}
            </div>
          )
        }
      </div>
    );

    // return (
    //   <div className="episodes">
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
      Object.keys(episodes.map((key, index) => (
        this.setState({
          episodes: this.state.episodes.concat([episodes[index]])
        })
      )));
    });
  }

  async loadShowInformation() {
    const snapshot = await firebase.database().ref(this.state.stripped).once('value');

    const data = [];
    snapshot.forEach(child => {
      // console.log(child.val());
      const episode = {
        code: child.val()['Code'],
        name: child.val()['Name'],
        airdate: child.val()['Airdate'],
        writer: child.val()['Writer'],
        summary: child.val()['Summary'],
        location: child.val()['Location'],
      };

      data.push(episode);
    });
    return data;
  }
}


export default ShowResult;