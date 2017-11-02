import React from 'react';
import ReactDOM from 'react-dom';

export default class Search extends React.Component{
  render(){
    return (
      <div>
        <form>
          <label>Where:
            <input type="text" name="name" />
          </label>
          <button name="Submit">Search</button>
        </form>
      </div>
      );
  }
}

