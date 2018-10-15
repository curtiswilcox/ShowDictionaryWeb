import React from 'react';

function ShowIcon(props) {
  return (
    <div className='show' style={props.iconSize ? { '--icon-size' : props.iconSize } : {}} >
      <img className='showImage' src={props.titleCard} alt={props.name}/>
    </div>
  );
}

export default ShowIcon;