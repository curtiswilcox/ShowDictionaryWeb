import React from 'react';

function SearchBar(props) {
  return (
    <form className={'textsearch'}>
      <input
        className={'input-text'}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementsByClassName('inputbutton')[0].click();
          }
        }}
        type={"text"}
        placeholder={props.placeholder}
        value={props.filteredText}
      />
      <button
        className={'inputbutton'}
        onClick={props.onClick}
        type={'button'}
      >
        <i className={'fa fa-search'}/>
      </button>
    </form>
  );
}

export default SearchBar;