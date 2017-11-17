import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from './components/TitleBar.jsx';
import Search from './components/Search.jsx';
import EventsList from './components/EventsList.jsx';
import {deleteAllDocumentsAndSearch} from './../../helpers/deleteDocuments.js';

import axios from 'axios';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      events: []
    };

  this.onSearch = this.onSearch.bind(this);
  }

  onSearch(e, location){
    e.preventDefault();
    deleteAllDocumentsAndSearch(location, this);
  }

  render(){
    return(
      <div>
        <TitleBar/>
        <Search onSearch={this.onSearch}/>
        <EventsList events={this.state.events}/>
      </div>
      );
  }
}

ReactDOM.render(<App />,document.getElementById('app'));
