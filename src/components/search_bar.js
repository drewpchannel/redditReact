import React, { Component } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';

class SearchBar extends Component {
  constructor (props){
    super(props);
    this.state = ({
      subReddit: ''
    });
  }
  render () {
    return (
      <div>
        <input 
          value={this.state.subReddit}
          onChange={event => this.newSubReddit(event.target.value)} />
      </div>
    );
  }
  newSubReddit (subReddit) {
    this.setState({subReddit});
    this.props.updateSubReddit({subReddit});
  }
}

export default SearchBar;