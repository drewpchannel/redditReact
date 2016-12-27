import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RedditList from './components/reddit_item';
import SearchBar from './components/search_bar';
import SignIn from './components/signin_buttons';

//break up this file into components
//setting for slower internet 
//need to rename a lot of these components

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      redditDL: {},
      subReddit: 'https://www.reddit.com/.json',
      userEmail: 'default',
      option: 0
    };
    this.loadRedditArray ();
    this.redditDLArray = '';
  }
  loadRedditArray (option) {
    const xhr = new XMLHttpRequest();
    xhr.onload = (data) => {
      if (xhr.readyState === 4) {
        //correct way to do this?
        if(option === 'addPosts') {
          const x = JSON.parse(xhr.responseText);
          x.data.children.forEach((elem) => 
              {
                let combineRedditDl = this.redditDLArray;
                combineRedditDl.push(elem);
                let makeRedditDlObject = this.state.redditDL;
                makeRedditDlObject.data.children = combineRedditDl;
                this.setState({redditDL: makeRedditDlObject})
                this.redditDLArray = this.state.redditDL.data.children;
              }
            )
        } else if (option === 'newSub') {
          this.setState({
            redditDL: JSON.parse(xhr.responseText)
          })
          this.setState({option: this.redditDLArray.length});
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
      xhr.open("GET", this.state.subReddit);
    } else {
      xhr.open("GET", this.state.subReddit);
    }
    xhr.send();
  }
  setSubReddit (subReddit) {
    this.setState({subReddit: `https://www.reddit.com/r/${subReddit}/.json`})
    this.loadRedditArray ('newSub');
  }
  //this.subR? addposts string the best way?
  loadAdditionalPosts () {
    this.setState({subReddit: `${this.state.subReddit}?count=${this.state.option}&after=${this.redditDLArray[this.redditDLArray.length - 1].data.name}`});
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
        //need update subreddit state 
          updateSubReddit = {subReddit => setSubReddit(subReddit)}
        />
        <SignIn 
          findUserEmail = {userEmail => this.setUserEmail(userEmail)}
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