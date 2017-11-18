import React from 'react';
import ReactDOM from 'react-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import EventItem from './EventItem.jsx';
import EventsList from './EventsList.jsx';
import Keys from './../../../config/keys';

const style = {
      width: '25%',
      height: '40%'
    }


export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    // console.log("This is from Maps", this, this.props.lng)
    return (

      <Map google={this.props.google}
           onClick={this.onMapClicked}
           style={style}
           initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng
           }}>

        <Marker onClick={this.onMarkerClick} position={{lat:this.props.lat, lng:this.props.lng}}
                name={this.props.name} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    )
  }
};

export default GoogleApiWrapper({
  apiKey: (Keys.googleMaps)
})(MapContainer)

