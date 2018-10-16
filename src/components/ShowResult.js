import Episode from './Episode';
import React, {Component} from 'react';
import ShowIcon from './ShowIcon';
import firebase from '../util/firebase';
import {capitalizeFirstLetter, strip} from '../util/helper';
import Loader from 'react-loader-spinner';


class ShowResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stripped: strip(props.location.pathname.split('/')[props.location.pathname.split('/').length - 1]),
      loading: true,
      showInfo: {},
      episodes: [],
    };
    document.title = 'Information';
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='loadingIcon'>
          <Loader
            type={'TailSpin'}
            color={'#00BFFF'}
            height={100}
            width={100}
          />
        </div>
      );
    }

    return (
      <div className='episodes-wrapper'>
        <div className='showinfo'>
          <ShowIcon className='showcard' iconSize='10em' titleCard={this.state.showInfo.url}/>
          {/*<div className="namedesc">*/}
          {/*<span className='showname'>{this.state.showInfo.name}</span>*/}
          <span className='showdesc'>{this.state.showInfo.description}</span>
          {/*</div>*/}
        </div>
        <div className='episodes'>
          {
            this.state.episodes.map((episode, i) => {
              const capitalSeasonType = capitalizeFirstLetter(this.state.showInfo.seasonType);
              return (
                <div key={i}>
                  {episode.numberInSeason === 1 && <h1>{capitalSeasonType + " " + episode.seasonNumber}</h1>}
                  <Episode episode={episode}/>
                </div>
              );
            })
          }
        </div>
      </div>
    );

  }

  componentDidMount() {
    this.loadShowInformation().then((episodes) => {
      Object.keys(episodes.map((episode, index) => (
        this.setState({
          episodes: this.state.episodes.concat(episode)
        })
      )));
      this.setState({loading: false});
    });
  }

  async loadShowInformation() {
    const shows = await firebase.database().ref('shows').once('value');
    shows.forEach(child => {
      if (child.val()['Filename'] === this.state.stripped) {
        const name = child.val().Name;
        const description = child.val().Description;
        const seasonType = child.val().TypeOfSeasons;
        const url = child.val().URL;
        document.title = name + ' Information';
        this.setState({showInfo: {description, name, seasonType, url}})
      }
    });

    const snapshot = await firebase.database().ref(this.state.stripped).once('value');

    const data = [];
    snapshot.forEach(child => {
      const ep = child.val();
      const episode = {
        code: ep.Code,
        name: ep.Name,
        airdate: ep.Airdate,
        writer: ep.Writer,
        summary: ep.Summary,
        location: ep.Location,
        seriesNumber: parseInt(ep.EpisodeInSeries),
        seasonNumber: parseInt(ep.SeasonNumber),
        numberInSeason: parseInt(ep.EpisodeInSeason),
      };

      data.push(episode);
    });
    return data;
  }
}


export default ShowResult;