import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    left:'250px',
    right:'0px',
    top:'250px',
    bottom:'0px'
  }

  keyPress = (event) => {
    if(event.key === 'd'){
      this.setState({
        left: `${parseInt(this.state.left) + 10}px`
      },() => console.log(this.state))
    }else if(event.key === 'a'){
      this.setState({
        left: `${parseInt(this.state.left) - 10}px`
      },() => console.log(this.state))
    }else if(event.key === 'w'){
      this.setState({
        top: `${parseInt(this.state.top) - 10}px`
      },() => console.log(this.state))
    }else if (event.key === 's') {
      this.setState({
        top: `${parseInt(this.state.top) + 10}px`
      },() => console.log(this.state))
    }
  }

  render() {
    return (

      <div className="App">
        <h1 className="title">super cool game</h1>
        <div className="Game">
          <Block keyPress={this.keyPress} right={this.state.right} left={this.state.left} top={this.state.top} bottom={this.state.bottom}/>
        </div>

      </div>
    );
  }
}

class Block extends React.Component {
  componentDidMount(){
    window.addEventListener('keypress', this.props.keyPress)
  }
  render(){
      let style = {
        position: 'relative',
        width:'1em',
        height:'1em',
        top: this.props.top,
        bottom: this.props.bottom,
        left: this.props.left,
        right: this.props.right,
        backgroundColor: 'red'
      }
      return(
        <div style={style}/>
      )
    }
  }


export default App;
