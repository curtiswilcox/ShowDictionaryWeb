import React, {Component} from 'react';
import firebase from '../util/firebase';
import ShowIcon from './ShowIcon';
import {Link} from 'react-router-dom';
import {strip} from '../util/helper';
import Loader from 'react-loader-spinner';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shows: [],
      language: navigator.language.split('-')[0],
    };
    this.updateApp = props.updateApp;
    document.title = 'Show Dictionary';
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loadingIcon">
          <Loader
            type={"Ball-Triangle"}
            color={"#00BFFF"}
            height={100}
            width={100}
          />
        </div>
      );
    }
    return (
      <div className='ShowDictionary'>
        {
          this.state.shows.map((show, index) =>
            <Link
              key={index}
              to={{
                pathname: this.props.location.pathname + strip(show.showname),
              }}
            >
              <ShowIcon
                key={index}
                imgClass={'showimage'}
                spanClass={'showlink'}
                name={show.showname}
                stripped={strip(show.showname)}
                titleCard={show.titleCard}
              />
            </Link>
          )
        }
      </div>
    );
  }

  componentDidMount() {
    this.getShows().then((shows) => {
      Object.keys(shows.map((key, index) => (
        this.setState({
          shows: this.state.shows.concat(key)
        })
      )));
      this.setState({loading: false})
    })
  }

  async getShows() {
    let language = '';
    if (this.state.language === 'en' || this.state.language === 'es') {
      language = this.state.language;
    } else {
      language = 'en';
    }
    this.setState({language: language});
    const snapshot = await firebase.database().ref().child('shows/' + language).once('value');

    const data = [];
    snapshot.forEach(child => {
      const show = child.val();
      const showname = show.name;
      const titleCard = show.url;

      data.push({showname, titleCard})
    });

    data.sort((show0, show1) => {
      const name0 = show0.showname.toLowerCase().replace(/^the /, '');
      const name1 = show1.showname.toLowerCase().replace(/^the /, '');
      return name0 < name1 ? -1 : 1;
    });

    return data;
  }

  // async loadShowInformation(showname) {
  //   const snapshot = await firebase.database().ref(this.strip(showname)).once('value');
  //
  //   const data = [];
  //   snapshot.forEach(child => {
  //     // console.log(child.val());
  //     const episode = {
  //       code: child.val()['Code'],
  //       name: child.val()['Name'],
  //       airdate: child.val()['Airdate'],
  //       writer: child.val()['Writer'],
  //       summary: child.val()['Summary'],
  //       location: child.val()['Location'],
  //     };
  //
  //     data.push(episode);
  //   });
  //   return data;
  // }
  //
  // noinspection JSMethodCanBeStatic
  // strip(showname) {
  //   showname = showname.toString().toLowerCase().split(' ').join('');
  //   showname = showname.split(':').join('');
  //   showname = showname.split(''').join('');
  //   return showname;
  // }
}

export default Home;