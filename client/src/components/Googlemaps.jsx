import React from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
      width: '50%',
      height: '50%'
    }

export class MapContainer extends React.Component {


  render() {
      return (
        <Map google={this.props.google} style={style} zoom={14}>
          <Marker onClick={this.onMarkerClick} name={'Current location'} />
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