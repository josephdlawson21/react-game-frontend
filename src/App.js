import React from 'react'
import Game from './components/Game'
import NavBar from './components/NavBar'
import LogIn from './components/LogIn'
import {Switch, Route} from 'react-router-dom'
import About from './components/About'
import Leaderboard from './components/Leaderboard'

class App extends React.Component {
  state = {
    auth: {
      loggedIn: false
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.setState({
        auth: {
          loggedIn: true,
          token: token
        }
      })
    }
  }



  login = (j) => {
    localStorage.setItem('token', j.token)
    this.setState({
      auth: {
        loggedIn: true,
        token: j.token
      }
    })
  }

  logout = (e) => {
    localStorage.removeItem('token')
    this.setState({
      auth: {
        loggedIn: false,
        token: undefined
      }
    })
  }


  render () {
    return(
      <div>
        <NavBar logOutFunc={this.logout}/>
        <Switch>
          <Route path='/about' render={() => <About/>}/>
          <Route path='/leaderboard' render={() => <Leaderboard/>}/>
          <Route path='/' render={() => {
            return this.state.auth.loggedIn ? <Game/> : <LogIn loginFunc={this.login} logoutFunc={this.logout} auth={this.state.auth} />}
          }></Route>
        </Switch>
      </div>
    )
  }
}

export default App;
