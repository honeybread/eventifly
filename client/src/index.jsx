import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from './components/TitleBar.jsx';
import Search from './components/Search.jsx';
import EventsList from './components/EventsList.jsx';
import $ from 'jquery';
import {getEvents} from './../../helpers/eventbrite.js';
import MapContainer from './components/Googlemaps.jsx';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      events: [],
      location:[]
    }


   // this.onSearch = this.onSearch.bind(this);
  }

  onSearch(e, location){
    e.preventDefault();
    console.log("came to location", location);
    //this.setState({location: location});

    getEvents(this, location);
  }

  render(){
    return(
      <div>
        <TitleBar/>
        <Search onSearch={this.onSearch.bind(this)}/>
        <EventsList events={this.state.events}/>
        <MapContainer location={this.state.location} />
      </div>
    );
  }
}

ReactDOM.render(<App />,document.getElementById('app'));
