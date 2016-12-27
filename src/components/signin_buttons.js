import React, { Component } from 'react';

//make this an array and load in each website login?
class SignIn extends Component {
  constructor (props) {
    super(props);
    this.state = ({
      userEmail: 'default'
    })
  }
  componentDidMount () {
    this.onSignIn()
  }
  onSignIn () {
    //find a way to replace the setTimeout.  mayeb redo google login? https://developers.google.com/identity/sign-in/web/reference
    if (typeof gapi !== undefined) {
      if (typeof(gapi.auth2) === "object") {
        let timeoutID = window.setTimeout(()=>
          {
            if (timeoutID !== 2) {
              window.clearTimeout(timeoutID);
            } 
            else {
              if (gapi.auth2.getAuthInstance().currentUser.Ab.w3 !== undefined) {
                this.props.findUserEmail(gapi.auth2.getAuthInstance().currentUser.Ab.w3.U3)
                this.setState({userEmail: gapi.auth2.getAuthInstance().currentUser.Ab.w3.U3})
              }  
            }
          }, 500)
      }
    } else {
      console.log('gapi was not defined, reloading the page usually gets this item from google');
    }
  }
  render () {
    return (
      <div className="g-signin2" data-onsuccess={this.onSignIn()}></div>
    )
  }
}

export default SignIn;