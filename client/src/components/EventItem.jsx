import React from 'react';
import MapContainer from './Googlemaps.jsx';
import {Panel, Media, Collapse, Well} from 'react-bootstrap';

class EventItem extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      open: false,
      details: this.props.event.details.eventbrite? this.props.event.details.eventbrite: this.props.event.details.yelp
    }
  }

  render() {
    return (
      <Panel>
        <Media onClick={() => {this.setState({open: !this.state.open})}}>
          
          <Media.Body>
            <Media.Heading><a target="_blank" href={this.state.details.eventUrl}>{this.state.details.name}</a></Media.Heading>
            
            <p>{this.props.event.startDate}</p>
            <p>{this.props.event.startTime}</p>
            <div>
              <Collapse in={this.state.open}>
              <div>
                <Well> 
                   {this.state.details.description}
                </Well>
              </div>  
              </Collapse>
            </div>
  
            
          </Media.Body>
          
        </Media>
      </Panel>
    )
  }
  
}

export default EventItem;
