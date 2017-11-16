import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from './components/TitleBar.jsx';
import Search from './components/Search.jsx';
import EventsList from './components/EventsList.jsx';
import $ from 'jquery';
import {getEvents, getEventsfromCoords} from './../../helpers/eventbrite.js';
import {getLocation} from './../../helpers/getCurrentLocation.js';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      location: 'current location',
      events: []
    }

   // this.onSearch = this.onSearch.bind(this);
  }

  onSearch(e, location){
    var app = this;
    e.preventDefault();
    console.log("came to location", location);
    //this.setState({location: location});
    if (location.toLowerCase() === 'current location'){
      this.searchCurrentlocation();
    }
    else{
      getEvents(this, location);
    }
  }

  componentDidMount(){
    this.searchCurrentlocation();
  }

  searchCurrentlocation(){
     var app = this;
     if (!navigator.geolocation){
        console.log("Geolocation not supported!");
      }
      else{
        console.log("Geolocation supported.");
        getLocation(navigator.geolocation, function(err, data){
          if (err){
            console.log(err);
          }
          else{
            console.log(data);
            getEventsfromCoords(data, function (err2, data2){
              if (err2){
                console.log(err2);
              }
              else{
                console.log(data2);
                app.setState(
                  {events : data2});
              }
            });
          }
        })
        //getEvents(this, location);
      }
  }
  render(){
    return(
      <div>
        <TitleBar/>
        <Search location={this.state.location} onSearch={this.onSearch.bind(this)}/>
        <EventsList events={this.state.events}/>
      </div>
      );
  }
}

ReactDOM.render(<App />,document.getElementById('app'));
