import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RedditList from './components/reddit_item';
import SearchBar from './components/search_bar';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      redditDL: {},
      subReddit: ''
    };
    this.loadRedditArray ('frogs');
  }
  // need dynamic search terms to be sent to load array
  loadRedditArray (subReddit) {
    var xhr = new XMLHttpRequest();
    xhr.onload = (data) => {
      if (xhr.readyState === 4) {
          this.setState({
          redditDL: JSON.parse(xhr.responseText)
        })
      }
    }
    xhr.open("GET", `https://www.reddit.com/r/${subReddit}.json`);
    xhr.send();
  }
  setSubReddit (subReddit) {
    //needs to be refactored.  putting objects in obj for no reason
    this.loadRedditArray (subReddit.subReddit.subReddit);
  }
  render () {
    const setSubReddit = _.debounce((subReddit) => {this.setSubReddit(subReddit)}, 600);
    return (
      <div>
        <SearchBar 
          updateSubReddit = {subReddit => setSubReddit({subReddit})}
        />
        <RedditList
          redditDL = {this.state.redditDL}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));