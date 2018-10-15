import React, {Component} from 'react';
import moment from 'moment';

class Episode extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      summaryVisible: true,
    }
  }

  toggleSummaryVisibility = () => this.setState(prevState =>
    ({summaryVisible: !prevState.summaryVisible})
  );

  render() {
    const {episode} = this.props;
    return (
      <div
        className='episode'
      >
        <div className='code'>
          <span>{episode.code} </span>
        </div>

        <h1 className='name'>{episode.name} </h1>

        <span className='writer'>{episode.writer} </span>
        <span className='airdate'>{moment(episode.airdate).format('MMM DD YYYY').toLocaleString()} </span>

        <span className='location'>{episode.location} </span>
        <div hidden={!this.state.summaryVisible} className='summary'>
          <span>{episode.summary}</span>
        </div>
      </div>
    );
  }

}

export default Episode;