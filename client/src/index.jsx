import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from './components/TitleBar.jsx';
import Search from './components/Search.jsx';
import EventsList from './components/EventsList.jsx';
import $ from 'jquery';
import {getLocation} from './../../helpers/getCurrentLocation.js';
import MapContainer from './components/Googlemaps.jsx';
import {deleteAllDocumentsAndSearch} from './../../helpers/deleteDocuments.js';
import {dateAscendingSort} from './../../helpers/dateSort.js';
import axios from 'axios';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      location: 'current location',
      events: [],
      filteredEvents: []
    };


    this.onSearch = this.onSearch.bind(this);
    this.onDateSort = this.onDateSort.bind(this);
  }

  onSearch(e, location, latitude, longitude){
    if (e) e.preventDefault();
    if (location.toLowerCase() === 'current location' && navigator.geolocation){
      getLocation(navigator.geolocation, function(err, data) {
        if (err) console.error(err);
        console.log(data);
        deleteAllDocumentsAndSearch(undefined, data.coords.latitude, data.coords.longitude, this);
      }
    } else{
        deleteAllDocumentsAndSearch(location, latitude, longitude, this);
     }
 
  }
  
  componentDidMount(){
    this.onSearch(undefined, this.state.location, undefined, undefined);
  }

  onDateSort(e){
    e.preventDefault();
    this.state.events.sort( (a, b) => {
      return dateAscendingSort(a, b);
    });
    this.setState({filteredEvents: this.state.events});
  }

  render(){
    return(
      <div>
        <TitleBar/>
        <Search location={this.state.location} onSearch={this.onSearch}/>
        <EventsList events={this.state.filteredEvents} onDateSort={this.onDateSort}/>
      </div>
    );
  }
}

ReactDOM.render(<App />,document.getElementById('app'));
