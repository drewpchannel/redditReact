import React, { Component } from 'react';

//make this an array and load in each website login?
class SignIn extends Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.onSignIn()
  }
  onSignIn () {
    //find a way to replace the setTimeout.  mayeb redo google login? https://developers.google.com/identity/sign-in/web/reference
    if (typeof(gapi.auth2) === "object") {
      window.setTimeout(()=>
        {
          if (gapi.auth2.getAuthInstance().currentUser.Ab.w3 !== undefined) {
            console.log(gapi.auth2.getAuthInstance().currentUser.Ab.w3.U3)
          }  
        }, 500)
    }
  }
  render () {
    return (
      <div className="g-signin2" data-onsuccess={this.onSignIn()}></div>
    )
  }
}

export default SignIn;