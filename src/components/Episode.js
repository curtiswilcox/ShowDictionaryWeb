import React from 'react';
import moment from 'moment';


function Episode({episode}) {
  return (
    <div className='episode'>
      <span className='code'>{episode.Code}</span>

      <h1 className='name'>{episode.Name}</h1>

      <span className="episodenum">{episode.EpisodeInSeries}</span>

      <div className="writerairdate">
        <span className='writer'>{episode.Writer}</span>
        <span className='airdate'>{moment(episode.Airdate).format('MMM DD, YYYY').toLocaleString()} </span>
      </div>

      <div className='summary'>{episode.Summary}</div>
    </div>
  );
}

export default Episode;
