import React from 'react';
import ReactDOM from 'react-dom';
import TitleBar from './components/TitleBar.jsx';
import Search from './components/Search.jsx';
import EventsList from './components/EventsList.jsx';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  onSearch(){

  }

  render(){
    return(
      <div>
        <TitleBar/>
        <Search onSearch={this.onSearch.bind(this)}/>
      </div>
      );
  }
}

ReactDOM.render(<App />,document.getElementById('app'));