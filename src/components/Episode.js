import React from 'react';

function Episode(props) {

  return (
    <tr>
      <td>{props.code}</td>
      <td>{props.name}</td>
      <td>{props.airdate}</td>
      <td>{props.writer}</td>
      <td>{props.summary}</td>
      <td>{props.location}</td>
    </tr>
  )
}

export default Episode;