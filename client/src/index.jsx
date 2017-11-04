import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from './components/TitleBar.jsx';
import Search from './components/Search.jsx';
import EventsList from './components/EventsList.jsx';
import $ from 'jquery';



class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(e, location){
    e.preventDefault();
    console.log("came to location", location);

    $.ajax({
      type: "GET",
      url: "http://127.0.0.1:3000/events",
      data: {location: this.state.location},
      success: function(){
        console.log("Successful Get")
      }

    })
  }


  render(){
    return(
      <div>
        <TitleBar/>
        <Search onSearch={this.onSearch}/>
      </div>
      );
  }
}

ReactDOM.render(<App />,document.getElementById('app'));