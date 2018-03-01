


import React from 'react'
import './App.css';

const KEY = {
  LEFT:  37,
  RIGHT: 39,
  UP: 38,
  A: 65,
  D: 68,
  W: 87,
  SPACE: 32
};

//
// const Hero = (map,x,y,ctx) => {
//   let character = document.getElementById('character');
//
//   ctx.drawImage(character, x,y)
// }

class Hero extends React.Component {
  constructor(map,x,y,ctx){
    super()

    this.character = document.getElementById('character');

    ctx.drawImage(this.character, x,y)
  }

}


class Game extends React.Component {
  state = {
    context: null,
    heroX: 320,
    heroY: 620
  }
  moveHero = (event) => {
    if(event.key === 'd'){
      if(this.state.heroX < 620){
        this.setState({
          heroX: this.state.heroX + 100
        });
      }
    }else if(event.key === 'a'){
      if(this.state.heroX >= 21){
        this.setState({
          heroX: this.state.heroX - 100
        });
      }
    }else if(event.key === 'w'){
      if(this.state.heroY >= 21){
        this.setState({
          heroY: this.state.heroY - 100
        });
      }
    }else if (event.key === 's') {
      if(this.state.heroY < 620){
        this.setState({
          heroY: this.state.heroY + 100
        });
      }
    }
  }


  componentDidMount() {
    requestAnimationFrame(() => this.update());
  }

  update = () => {
    let dirt = document.getElementById('dirt');
    let grass = document.getElementById('grass');
    let ctx = document.getElementById('canvas').getContext('2d')
    let tiles = [
      //left
      [1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0],
      [1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0], //bottom
      [1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0],
      [1,0,1,0,1,0,1]
      //right
    ]



    for(let i = 0; i < tiles.length; i++){
      for(let j = 0; j < tiles[i].length; j++){
        if(tiles[i][j] === 0){
          ctx.drawImage(dirt, 100*i, 100*j);
        }else if(tiles[i][j] === 1){
          ctx.drawImage(grass, 100*i, 100*j);
        }
      }
    }

    let bob = new Hero(tiles, this.state.heroX, this.state.heroY, ctx)
    window.addEventListener('keypress', this.moveHero)

    requestAnimationFrame(() => {this.update()})
  }


  render () {

    return(
      <div className="App">
        <h1 className="title">super cool game</h1>
        <canvas id="canvas" width="700" height="700">

        </canvas>
        <div className="imgHider">
          <img id="dirt" src={require('./dirt-tile.png')}/>
          <img id="grass" src={require('./grass-tile.png')}/>
          <img id="character" src={require('./character-tile.png')}/>
        </div>
      </div>
    )
  }
}

export default Game;
