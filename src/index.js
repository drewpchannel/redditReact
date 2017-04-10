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
      userEmail: 'default'
    };
    this.countPosts = 0;
    this.subRedditURL = 'https://www.reddit.com/.json';
    this.loadRedditArray ();
    this.redditDLArray = '';
  }
  loadRedditArray (option) {
    const xhr = new XMLHttpRequest();
    xhr.onload = (data) => {
      if (xhr.readyState === 4) {
        if(option === 'addPosts') {
          const x = JSON.parse(xhr.responseText);
          let combineRedditDl = this.redditDLArray;
          let makeRedditDlObject = this.state.redditDL;
          x.data.children.forEach((elem) => 
              {
                combineRedditDl.push(elem);
                makeRedditDlObject.data.children = combineRedditDl;
                this.redditDLArray = this.state.redditDL.data.children;
              }
            )
          this.setState({redditDL: makeRedditDlObject})
        } else if (option === 'newSub') {
          this.setState({
            redditDL: JSON.parse(xhr.responseText)
          })
          this.countPosts = this.countPosts + this.redditDLArray.length;
          this.redditDLArray = this.state.redditDL.data.children;
        } else {

          this.setState({
            redditDL: JSON.parse(xhr.responseText)
          });
          this.redditDLArray = this.state.redditDL.data.children;
        }
      }
    }
    if(option) {
      xhr.open("GET", this.subRedditURL);
    } else {
      xhr.open("GET", this.subRedditURL);
    }
    xhr.send();
  }
  setSubReddit (subReddit) {
    this.subRedditURL = `https://www.reddit.com/r/${subReddit}/.json`;
    this.loadRedditArray ('newSub');
  }
  loadAdditionalPosts () {
    this.countPosts = this.countPosts + 25;
    this.subRedditURL = `${this.subRedditURL}?count=${this.countPosts}&after=${this.redditDLArray[this.redditDLArray.length - 1].data.name}`;
    this.loadRedditArray ('addPosts');
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
        <RedditList
          redditDL = {this.state.redditDL}
          loadMorePosts = {this.loadAdditionalPosts.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));