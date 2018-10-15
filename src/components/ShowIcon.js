import React from 'react';

function ShowIcon(props) {
  return (
    <div className="show">
      <button className="showButton">
        <img className="showImage" src={props.titleCard} alt={props.name}/>
      </button>
    </div>
  );
}

export default ShowIcon;