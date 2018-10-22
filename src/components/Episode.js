import React from 'react';
import moment from 'moment';


function Episode({episode}) {
  return (
    <div className='episode'>
      <span className='code'>{episode.code}</span>

      <h1 className='name'>{episode.name}</h1>

      <span className="episodenum">{episode.episodeInSeries}</span>

      <div className="writerairdate">
        <span className='writer'>{episode.writer}</span>
        <span className='airdate'>{moment(episode.airdate).format('MMM DD, YYYY').toLocaleString()} </span>
      </div>

      <div className='summary'>{episode.summary}</div>
    </div>
  );
}

export default Episode;