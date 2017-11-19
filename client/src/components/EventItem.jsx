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
          <Media.Left>
            <MapContainer lat={this.props.event.lat} lng={this.props.event.long} name={this.state.details.name}/>
          </Media.Left>
          <Media.Body>
            <Media.Heading><a target="_blank" href={this.state.details.eventUrl}>{this.state.details.name}</a></Media.Heading>
            
            <p>{this.props.event.startDate}</p>
            <p>{this.props.event.startTime}</p>
            <div>
              <Collapse in={this.state.open}>
              <div>
                <Well>  {this.state.details.description}
                
                <Panel collapsible expanded={this.state.open}>
                    
                </Panel>
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

// Panel>
// <Media onClick={() => {this.setState({open: !this.state.open})}}>

//  <Media.Left>
//     <img src={this.props.event.logo.url} height={64} width={128} alt=“Event Image”/>
//   </Media.Left>

//  <Media.Body>
//     <Media.Heading><a href={this.props.event.url} target=“_blank”>{this.props.event.name.text}</a></Media.Heading>
//     <div>
//       Local Date: {this.state.date}
//     </div>

//    <div>
//       Local Time: {this.state.time}
//     </div>

//    <div>
//       {/* <Button bsStyle=“small” onClick={() => {this.setState({open: !this.state.open})}}> Description </Button> */}
//         <Collapse in={this.state.open}>
//           <div>
//             <Well>  {this.props.event.description.text}  </Well>
//           </div>  
//        </Collapse>
//     </div>
//   </Media.Body>

// </Media>
// </Panel>
