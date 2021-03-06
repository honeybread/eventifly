import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'

export default class Search extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      input_location: this.props.location
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e){
    this.setState({'input_location':e.target.value});
  }


  render(){
    return (
      <div>
        <form>
          <label>Where:
            <input value={this.state.input_location} type="text" name="name" onChange = {this.handleInput}/>
          </label>
          <button onClick={(e) => {this.props.onSearch(e, this.state.input_location)}}>
            <Link to="/events" style={{textDecoration: 'none'}}>   
              Search
            </Link>
          </button>
        </form>
      </div>
      );
  }

}
