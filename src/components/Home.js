import React, {Component} from 'react';
// import firebase from '../util/firebase';
import ShowIcon from './ShowIcon';
import {Link} from 'react-router-dom';
import {strip} from '../util/helper';
import Loader from 'react-loader-spinner';

const axios = require('axios');

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
        <div className='loadingIcon'>
          <Loader
            type={'BallTriangle'}
            color={'#00BFFF'}
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
                pathname: this.props.location.pathname + strip(show.filename),
              }}
              target='_blank'
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
        this.setState({ shows: this.state.shows.concat(key) })
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

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://wilcoxcurtis.com/show-dictionary/files/shows_' + language + '.json';
    const data = []

    const response = await axios.get(proxyurl + url)

    const r = response.data.replace('<pre> ', '').replace('</pre>', '')
    const json = JSON.parse(r);
    for (var i = 0; i < json.length; i++) {
      const showname = json[i].Name.toString();
      const filename = json[i].Filename.toString()
      const titleCard = json[i].URL.toString();
      data.push({showname, filename, titleCard})
    }

    data.sort((show0, show1) => {
      const name0 = show0.showname.toLowerCase().replace(/^the /, '');
      const name1 = show1.showname.toLowerCase().replace(/^the /, '');
      return name0 < name1 ? -1 : 1;
    });

    return data;
  }
}

export default Home;
