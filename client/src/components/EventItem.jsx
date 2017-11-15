import React from 'react';
import {Panel, Media, Button, Collapse, Well} from 'react-bootstrap';

class EventItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      date: this.props.event.start.local.split("T")[0],
      time: this.props.event.start.local.split("T")[1]
    }
  }
  
  render() {
    return (

      <Panel>
        <Media onClick={() => {this.setState({open: !this.state.open})}}>

          <Media.Left>
            <img src={this.props.event.logo.url} height={64} width={128} alt="Event Image"/>
          </Media.Left>

          <Media.Body>
            <Media.Heading><a href={this.props.event.url} target="_blank">{this.props.event.name.text}</a></Media.Heading>
            <div>
              Local Date: {this.state.date}
            </div>

            <div>
              Local Time: {this.state.time}
            </div>

            <div>
              {/* <Button bsStyle="small" onClick={() => {this.setState({open: !this.state.open})}}> Description </Button> */}
                <Collapse in={this.state.open}>
                  <div>
                    <Well>  {this.props.event.description.text}  </Well>
                  </div>  
                </Collapse>
            </div>
          </Media.Body>

        </Media>
      </Panel>

  
    );

  }
  
}

export default EventItem;
