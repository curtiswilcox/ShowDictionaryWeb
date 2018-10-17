import Episode from './Episode';
import React, {Component} from 'react';
import firebase from '../util/firebase';
import {capitalizeFirstLetter, strip} from '../util/helper';
import Loader from 'react-loader-spinner';
import ShowIcon from "./ShowIcon";


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
            type={'Ball-Triangle'}
            color={'#00BFFF'}
            height={100}
            width={100}
          />
        </div>
      );
    }

    return (
      <div className='episodes-wrapper'>

        <div className="showinfo">
          {/*<img className="showcard" src={this.state.showInfo.url} alt={this.state.showInfo.name + " title card"}/>*/}
          <ShowIcon spanClass={'showprev'} imgClass={'showcard'} titleCard={this.state.showInfo.url}
                    name={this.state.showInfo.name} iconsize={"10em"}/>
          <span className='showdesc'>{this.state.showInfo.description}</span>
        </div>
        {/*<div className='showinfo'>*/}
        {/*/!*<ShowIcon className='showcard' iconSize='10em' titleCard={this.state.showInfo.url}/>*!/*/}
        {/*<img src={this.state.showInfo.url}/>*/}
        {/*{this.state.showInfo.description}*/}
        {/*/!*<span className='showdesc'>{this.state.showInfo.description}</span>*!/*/}
        {/*</div>*/}
        <div className='episodes'>
          {
            this.state.episodes.map((episode, i) => {
              const capitalSeasonType = capitalizeFirstLetter(this.state.showInfo.seasonType);

              let seasonTitle = null;
              if (this.state.showInfo.seasonTitles.length !== 0) {
                seasonTitle = this.state.showInfo.seasonTitles[episode.seasonNumber - 1];
              }

              return (
                <div key={i}>
                  {episode.numberInSeason === 1 &&
                  <h1>{capitalSeasonType + " " + episode.seasonNumber + (seasonTitle == null ? "" : ": " + seasonTitle)}</h1>}
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
    this.loadShowInformation().then((showInfo) => {
      const episodes = showInfo[0];
      const seasonTitles = showInfo[1];
      Object.keys(episodes.map((episode, index) => (
        this.setState({
          episodes: this.state.episodes.concat(episode)
        })
      )));
      this.setState(prevState => ({
          showInfo: {
            ...prevState.showInfo,
            seasonTitles,
          },
          loading: false,
        }
      ));
    });
  }

  async loadShowInformation() {
    const shows = await firebase.database().ref('shows').once('value');
    shows.forEach(child => {
      const show = child.val();
      if (show.Filename === this.state.stripped) {
        const name = show.Name;
        const description = show.Description;
        const seasonType = show.TypeOfSeasons;
        const url = show.URL;
        document.title = name + ' Information';
        this.setState({showInfo: {description, name, seasonType, url, seasonTitles: []}})
      }
    });

    const snapshot = await firebase.database().ref(this.state.stripped).once('value');
    const data = [];
    const seasonTitles = [];
    snapshot.forEach(child => {
      const ep = child.val();
      try {
        const seasonTitle = ep.SeasonTitle;
        if (!seasonTitles.includes(seasonTitle)) {
          seasonTitles.push(seasonTitle);
        }
      } catch (e) {
        // no season title, continue
      }

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
    /*this.setState(prevState => ({
      showInfo: {
        ...prevState.showInfo,
        seasonTitles,
      }
    }));*/
    return [data, seasonTitles];
  }
}


export default ShowResult;