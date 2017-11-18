import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from './components/TitleBar.jsx';
import Search from './components/Search.jsx';
import EventsList from './components/EventsList.jsx';
import $ from 'jquery';
import MapContainer from './components/Googlemaps.jsx';
import {deleteAllDocumentsAndSearch} from './../../helpers/deleteDocuments.js';
import {dateAscendingSort} from './../../helpers/dateSort.js';
import axios from 'axios';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      filteredEvents: []
    };

    this.onSearch = this.onSearch.bind(this);
    this.onDateSort = this.onDateSort.bind(this);
  }

  onSearch(e, location, latitude, longitude){
    e.preventDefault();
    deleteAllDocumentsAndSearch(location, latitude, longitude, this);
  }

  onDateSort(e){
    e.preventDefault();
    this.state.events.sort( (a, b) => {
      return dateAscendingSort(a, b);
    });
    this.setState({filteredEvents: this.state.events});
  }


  render(){
    // console.log("WHAT IS THIS", this.state.events)
    return(

      <div>
        <TitleBar/>
        <Search onSearch={this.onSearch}/>
        <EventsList events={this.state.filteredEvents} onDateSort={this.onDateSort}/>
      </div>
    );
  }
}

ReactDOM.render(<App />,document.getElementById('app'));
