import React from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import EventItem from './EventItem.jsx';


const style = {
      width: '75%',
      height: '75%'
    }



export class MapContainer extends React.Component {

  render() {
      return (
        <Map
          google={this.props.google}
          style={style}
          zoom={12}
          initialCenter={{
            lat: 37.774867,
            lng: -122.394176
          }}

        >
          <Marker onClick={this.onMarkerClick} name={'Current location'} />
          <Marker name={event.name} position={{lat: 22.123123}, {lng: -122.125142}} />
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>

              </div>
          </InfoWindow>
        </Map>
      );
    }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyAU3zFD4SoxOh7YFMh_aOBdvdEDGLIwxEo")
})(MapContainer)


// <h1>{this.state.selectedPlace.name}</h1>