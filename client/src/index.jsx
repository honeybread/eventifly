import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from './components/TitleBar.jsx';
import Search from './components/Search.jsx';
import EventsList from './components/EventsList.jsx';
import $ from 'jQuery';


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