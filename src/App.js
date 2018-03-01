import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    left:'50px',
    right:'0px',
    top:'0px',
    bottom:'0px'
  }

  onRight = (event) => {
    if(event.key === 'd'){
      this.setState({
        left: `${parseInt(this.state.left) + 1}px`
      },() => console.log(window))
    }else if(event.key === 'a'){
      this.setState({
        left: `${parseInt(this.state.left) - 1}px`
      },() => console.log(window))
    }else if(event.key === 'w'){
      this.setState({
        top: `${parseInt(this.state.top) + 1}px`
      },() => console.log(window))
    }
  }

  onLeft = (event) => {
    if(event.key === 'a'){
      this.setState({
        left: `${parseInt(this.state.left) - 1}px`
      },() => console.log(window))
    }
  }

  render() {
    return (
      <div className="App">
        <Block onLeft={this.onLeft} onRight={this.onRight} right={this.state.right} left={this.state.left}/>
      </div>
    );
  }
}

class Block extends React.Component {
  componentDidMount(){
    window.addEventListener('keypress', this.props.onRight)
  }
  render(){
      let style = {
        position: 'relative',
        width:'1em',
        height:'1em',
        left: this.props.left,
        right: this.props.right,
        backgroundColor: 'red'
      }
      return(
        <div onClick={this.props.onRight} style={style}/>
      )
    }
  }


export default App;
