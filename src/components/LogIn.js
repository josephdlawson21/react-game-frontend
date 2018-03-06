import React from 'react'
const LOGIN = "http://localhost:3000/login"
const CREATE = "http://localhost:3000/users"

class LogIn extends React.Component {
  state = {
    username: "",
    password: "",
    error: ""
  }

  updateUsername = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  updatePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  addError = (error) => {
    this.setState({
      error: error
    });
  }

  logIn = (event) => {
    event.preventDefault()
    console.log(this.state.username, this.state.password);
    fetch(LOGIN, {
      method: "post",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json()).then(json => {
      if (json.error) {
        this.addError(json.error);
      } else {
        this.props.loginFunc(json)
      }
    })
  }

  createUser = (event) => {
    event.preventDefault()
    console.log(this.state.username, this.state.password);
    fetch(CREATE, {
      method: "post",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json()).then(json => {
      if (json.error) {
        this.addError(json.error);
      } else {
        this.props.loginFunc(json)
      }
    })
  }

  render () {
    return(
      <div className="row container">
        <h3>Log In</h3>
        <form className="col s12">
          <p className="red-text">{this.state.error}</p>
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Username" id="Username" type="text" className="validate" onChange={this.updateUsername} />
              <label htmlFor="Username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="Password" type="password" className="validate" onChange={this.updatePassword} />
              <label htmlFor="Password">Password</label>
            </div>
          </div>
          <div className="row">
            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.logIn}>Log In
              <i className="material-icons right">send</i>
            </button>
          </div>
          <div className="row">
            <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.createUser}>Create User
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default LogIn;
