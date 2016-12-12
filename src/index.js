import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RedditList from './components/reddit_item';
import SearchBar from './components/search_bar';
import SignIn from './components/signin_buttons';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      redditDL: {},
      subReddit: '',
      userEmail: 'default'
    };
    this.loadRedditArray ();
  }
  loadRedditArray (subReddit) {
    var xhr = new XMLHttpRequest();
    xhr.onload = (data) => {
      if (xhr.readyState === 4) {
          this.setState({
          redditDL: JSON.parse(xhr.responseText)
        })
      }
    }
    let subRedditUrl;
    if (!subReddit) {
      subRedditUrl = 'https://www.reddit.com/.json'
    } else {
      subRedditUrl = `https://www.reddit.com/r/${subReddit}.json`
    }
    xhr.open("GET", subRedditUrl);
    xhr.send();
  }
  setSubReddit (subReddit) {
    this.loadRedditArray (subReddit);
  }
  setUserEmail (userEmail) {
    this.setState({userEmail});
  }
  render () {
    const setSubReddit = _.debounce((subReddit) => {this.setSubReddit(subReddit)}, 600);
    return (
      <div>
        <SearchBar 
          updateSubReddit = {subReddit => setSubReddit(subReddit)}
        />
        <SignIn 
          findUserEmail = {userEmail => this.setUserEmail(userEmail)}
        />
        <RedditList
          redditDL = {this.state.redditDL}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));