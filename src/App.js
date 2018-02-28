import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    left:'0px',
    right:'0px',
    top:'',
    bottom:''
  }

  onLeft = () => {
    this.setState({
      left: `${parseInt(this.state.left) + 1}px`
    },() => console.log(window))
    // console.log('onLeft works')
  }

  render() {
    return (
      <div className="App">
        <Block onLeft={this.onLeft} right={this.state.right} left={this.state.left}/>
      </div>
    );
  }
}

class Block extends React.Component {
  componentDidMount(){
    window.addEventListener('keypress', this.props.onLeft)
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
        <div onClick={this.props.onLeft} style={style}/>
      )
    }
  }


export default App;
