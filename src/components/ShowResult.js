import Episode from './Episode';
import React, {Component} from 'react';
import firebase from '../util/firebase';
import {capitalizeFirstLetter, strip, toggleVisibility} from '../util/helper';
import Loader from 'react-loader-spinner';
import ShowIcon from "./ShowIcon";
import SearchBar from './SearchBar';
import {SearchMethod} from "../util/SearchMethod";

class ShowResult extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stripped: strip(props.location.pathname.split('/')[props.location.pathname.split('/').length - 1]),
      loading: true,
      showInfo: {},
      episodes: [],
      filteredEpisodes: [],
      chosenSearchMethod: '',
      searchText: '',
      hasSelectedSeason: false,
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
      <div className='episodepage'>
        <div className='header'>
          <ul className={'tabs'}>
            {
              Object.keys(SearchMethod).map((method, index) => {
                return (
                  <li
                    className={'header' + method + ((method === SearchMethod.season || method === SearchMethod.number) ? ' dropdown' : '')}
                    key={index}
                    onClick={() => {
                      this.setState({chosenSearchMethod: method});
                      if (this.state.chosenSearchMethod !== SearchMethod.season) {
                        this.setState({hasSelectedSeason: false});
                      }

                      if (/*method !== SearchMethod.airdate && */method !== SearchMethod.season && method !== SearchMethod.random) {
                        const searchElement = document.getElementsByClassName('search-method-box')[0];
                        if (this.state.chosenSearchMethod !== method || (this.state.chosenSearchMethod === method && searchElement.style.display === 'none')) {
                          toggleVisibility('search-method-box', 'block');
                        } else {
                          toggleVisibility('search-method-box', 'none');
                        }
                        toggleVisibility('dropdown-content', 'none');
                      } else if (method === SearchMethod.random) { // TODO come back from random button?
                        toggleVisibility('search-method-box', 'none');
                        toggleVisibility('dropdown-content', 'none');
                        let prevNum = -1;
                        let epNum = -1;
                        if (this.state.filteredEpisodes.length !== 0) {
                          prevNum = this.state.filteredEpisodes[0].seriesNumber;
                        }
                        while (prevNum === epNum || epNum < 0) {
                          epNum = Math.floor(Math.random() * this.state.episodes.length);
                        }
                        this.setState({
                          filteredEpisodes: [this.state.episodes[epNum]],
                          searchText: epNum.toString()
                        })
                      } else if (method === SearchMethod.season) {
                        const searchElement = document.getElementsByClassName('dropdown-content')[0];
                        if (this.state.chosenSearchMethod !== method || (this.state.chosenSearchMethod === method && searchElement.style.display === 'none')) {
                          toggleVisibility('search-method-box', 'none');
                          toggleVisibility('dropdown-content', 'block');
                        } else {
                          toggleVisibility('dropdown-content', 'none');
                        }
                      }
                      // else if (method === SearchMethod.airdate) {
                      //   toggleVisibility('search-method-box', 'none');
                      //   toggleVisibility('dropdown-content', 'none');
                      // }
                    }}
                  >
                    {capitalizeFirstLetter(method === SearchMethod.season ? this.state.showInfo.seasonType : method)}
                    {(method === SearchMethod.season) ?
                      <div className={'dropdown-content'} style={{display: 'none'}}>
                        <ul>
                          {
                            Array(this.state.showInfo.numberOfSeasons).fill(0).map((season, i) =>
                              <li
                                onClick={() => {
                                  this.setState({searchText: i + 1, hasSelectedSeason: true},
                                    () => {
                                      this.filterEpisodes()
                                    });
                                }}
                                key={i + 1}>
                                {capitalizeFirstLetter(this.state.showInfo.seasonType) + ' ' + (i + 1)}
                              </li>
                            )
                          }
                        </ul>
                      </div>
                      : ''}
                  </li>)
              })
            }
          </ul>
          <div className="search-method-box" style={{display: 'none'}}>
            <SearchBar
              placeholder={'Enter episode ' +
              (this.state.chosenSearchMethod === SearchMethod.season
                ? this.state.showInfo.seasonType
                : this.state.chosenSearchMethod)
              + '...'}
              onClick={() => {
                const searchText = document.getElementsByClassName('input-text')[0].value;
                this.setState({searchText}, () => this.filterEpisodes());
              }}
              value={''}
            />
          </div>
        </div>

        <div className='episodes-wrapper'>
          <div className="showinfo">
            <ShowIcon
              spanClass={'showprev'}
              imgClass={'showcard'}
              titleCard={this.state.showInfo.url}
              name={this.state.showInfo.name} iconsize={'10em'}/>
            <span className='showdesc'>{this.state.showInfo.description}</span>
          </div>
          <div className='episodes'>
            {
              this.state.filteredEpisodes.map((episode, i) => {
                const capitalSeasonType = capitalizeFirstLetter(this.state.showInfo.seasonType);

                let seasonTitle = null;
                if (this.state.showInfo.seasonTitles.length !== 0) {
                  seasonTitle = this.state.showInfo.seasonTitles[episode.seasonNumber - 1];
                }

                return (
                  <div key={i}>
                    {
                      (((this.state.searchText === '' || (this.state.chosenSearchMethod === SearchMethod.season && this.state.hasSelectedSeason)) &&
                        ((i === 0) || // the first one
                          (episode.episodeInSeason === '0') || // "200", "400"
                          (episode.episodeInSeason === '1' && this.state.filteredEpisodes[i - 1].episodeInSeason !== '0')))) && // "501" and no "500"
                      <h1>
                        {capitalSeasonType + " " + episode.seasonNumber + (seasonTitle == null ? "" : ": " + seasonTitle)}
                      </h1>
                    }
                    <Episode episode={episode}/>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.loadShowInformation().then((showInfo) => {
      const episodes = showInfo[0];
      const seasonTitles = showInfo[1];
      Object.keys(episodes.map((episode) => (
        this.setState({
          episodes: this.state.episodes.concat(episode),
          filteredEpisodes: this.state.filteredEpisodes.concat(episode),
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

    window.onclick = event => { // TODO this is hard-coded right now -- need to change (for-loop)
      if (!document.getElementsByClassName('dropdown')[1].contains(event.target)) {
        if (document.getElementsByClassName('dropdown-content')[0].style.display === 'block') {
          document.getElementsByClassName('dropdown-content')[0].style.display = 'none';
        }
      }
    };
  }

  async loadShowInformation() {
    const shows = await firebase.database().ref('shows').once('value');
    shows.forEach(child => {
      const show = child.val();
      if (show.filename === this.state.stripped) {
        const name = show.name;
        const description = show.description;
        const numberOfSeasons = parseInt(show.numberOfSeasons);
        const seasonType = show.typeOfSeasons;
        const url = show.url;
        document.title = name + ' Information';
        this.setState({showInfo: {description, name, numberOfSeasons, seasonType, url, seasonTitles: []}})
      }
    });

    const snapshot = await firebase.database().ref(this.state.stripped).once('value');
    const data = [];
    const seasonTitles = [];
    snapshot.forEach(child => {
      const ep = child.val();
      try {
        const seasonTitle = ep.seasonTitle;
        if (!seasonTitles.includes(seasonTitle)) {
          seasonTitles.push(seasonTitle);
        }
      } catch (e) {
        // no season title, continue
      }
      data.push(ep);
    });
    return [data, seasonTitles];
  }


  filterEpisodes() {
    let filtered = [];
    const searchText = this.state.searchText;
    switch (this.state.chosenSearchMethod) {
      case SearchMethod.name:
        filtered = this.state.episodes
          .filter(episode => episode.name.toLowerCase().includes(searchText.toLowerCase()))
          .map(episode => episode);
        this.setState({filteredEpisodes: filtered});
        break;
      case SearchMethod.number:
        const epNum = parseInt(this.state.searchText);
        if (!isNaN(epNum) && this.state.searchText !== '') {
          filtered = this.state.episodes
            .filter(episode => parseInt(episode.episodeInSeries) === epNum)
            .map(episode => episode);
          this.setState({filteredEpisodes: filtered});
        }
        break;
      case SearchMethod.keyword:
        filtered = this.state.episodes
          .filter(episode => episode.summary.toLowerCase().includes(searchText.toLowerCase()) ||
            episode.keywords.toLowerCase().includes(searchText.toLowerCase()) ||
            episode.name.toLowerCase().includes(searchText.toLowerCase()))
          .map(episode => episode);
        this.setState({filteredEpisodes: filtered});
        break;
      case SearchMethod.season:
        filtered = this.state.episodes
          .filter(episode => parseInt(episode.seasonNumber) === searchText)
          .map(episode => episode);
        this.setState({filteredEpisodes: filtered});
        break;
      case SearchMethod.writer:
        filtered = this.state.episodes
          .filter(episode => episode.writer.toLowerCase().includes(searchText.toLowerCase()))
          .map(episode => episode);
        this.setState({filteredEpisodes: filtered});
        break;
      default:
        return;
    }
  }
}

export default ShowResult;