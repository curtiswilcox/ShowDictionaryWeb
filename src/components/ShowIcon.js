import React from 'react';

function ShowIcon(props) {
  return (
    <span className={props.spanClass} style={props.iconSize ? {'--icon-size': props.iconSize} : {}}>
      <img className={props.imgClass} src={props.titleCard} alt={props.name}/>
    </span>
  );
}

export default ShowIcon;