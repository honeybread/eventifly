import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import EventsList from './EventsList.jsx';
import $ from 'jquery';
import {getLocation} from './../../../helpers/getCurrentLocation.js';
import MapContainer from './Googlemaps.jsx';
import {deleteAllDocumentsAndSearch} from './../../../helpers/deleteDocuments.js';
import {dateAscendingSort} from './../../../helpers/dateSort.js';
import axios from 'axios';


class Main extends React.Component{
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
    var that = this;
    if (e) e.preventDefault();
    if (location.toLowerCase() === 'current location' && navigator.geolocation){
      getLocation(navigator.geolocation, function(err, data) {
        if (err) console.error(err);
        console.log(data);
        deleteAllDocumentsAndSearch(undefined, data.coords.latitude.toString(), data.coords.longitude.toString(), that);
      });
    }
      else{
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
        <Search location={this.state.location} onSearch={this.onSearch}/>
        <EventsList events={this.state.filteredEvents} onDateSort={this.onDateSort}/>
      </div>
    );
  }
}

export default Main;
