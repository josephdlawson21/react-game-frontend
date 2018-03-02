


import React from 'react'
import './App.css';
import Hero from './Hero'
import Coin from './Coin'

const KEY = {
  LEFT:  37,
  RIGHT: 39,
  UP: 38,
  A: 65,
  D: 68,
  W: 87,
  SPACE: 32
};

class Game extends React.Component {
  state = {
    context: null,
    heroCol: 6,
    heroRow: 6,
    coin: [],
    rock: [],
    map: {}
  }

  checkCollision = (col, row) => {
    if ([3,4].includes(this.state.map.getTile(col,row))) {
      return false
    } else {
      return true
    };
  }

  moveHero = (event) => {
    switch (event.key) {
      case 's':
        if(this.state.heroRow !== 6 && this.checkCollision((this.state.heroCol), (this.state.heroRow) + 1)){
          this.setState({
            heroRow: this.state.heroRow + 1
          });
        }
        break;
      case 'w':
        if(this.state.heroRow !== 0 && this.checkCollision((this.state.heroCol), (this.state.heroRow - 1))){
          this.setState({
            heroRow: this.state.heroRow - 1
          });
        }
        break;
      case 'a':
        if(this.state.heroCol !== 0 && this.checkCollision((this.state.heroCol - 1), (this.state.heroRow))){
          this.setState({
            heroCol: this.state.heroCol - 1
          });
        }
        break;
      case 'd':
        if(this.state.heroCol !== 6 && this.checkCollision((this.state.heroCol + 1), (this.state.heroRow))){
          this.setState({
            heroCol: this.state.heroCol + 1
          });
        }
        break;
    }
  }


  componentDidMount() {
    let map = {
      cols: 7,
      rows: 7,
      tsize: 100,
      tiles: [
        3,2,3,2,3,2,3,
        2,3,2,3,2,3,2,
        3,2,3,2,1,2,1,
        2,1,4,3,2,1,2,
        1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,
        1,2,1,2,1,2,1
      ],
      getTile: function(col, row) {
        return this.tiles[row * map.cols + col]
      }
    }
    this.setState({
      map: map
    });
    requestAnimationFrame(() => this.update());
  }

  update = () => {
    /////////////////////////create map /////////////////////////
    let dirt = document.getElementById('dirt');
    let grass = document.getElementById('grass');
    let rock = document.getElementById('rock');
    let coin = document.getElementById('coin');
    let ctx = document.getElementById('canvas').getContext('2d')

    for (var c = 0; c < this.state.map.cols; c++) {
      for (var r = 0; r < this.state.map.rows; r++) {
        var tile = this.state.map.getTile(c, r);
        switch (tile) {
          case 1:
            ctx.drawImage(
              grass, // image
              c * this.state.map.tsize, // target x
              r * this.state.map.tsize, // target y
            );
            break;
          case 2:
            ctx.drawImage(
              dirt, // image
              c * this.state.map.tsize, // target x
              r * this.state.map.tsize, // target y
            );
            break;
          case 3:
            ctx.drawImage(
              grass, // image
              c * this.state.map.tsize, // target x
              r * this.state.map.tsize, // target y
            );
            ctx.drawImage(
              rock, // image
              (c * this.state.map.tsize) + 10, // target x
              (r * this.state.map.tsize) + 10, // target y
            );
            break;
          case 4:
            ctx.drawImage(
              dirt, // image
              c * this.state.map.tsize, // target x
              r * this.state.map.tsize, // target y
            );
            ctx.drawImage(
              rock, // image
              (c * this.state.map.tsize) + 10, // target x
              (r * this.state.map.tsize) + 10, // target y
            );
            break;
        }

      }
    }


    /////////////////////////////////create coins //////////////////////////
    // Coin(110,110,ctx)
    // Coin(210,210,ctx)
    // Coin(310,310,ctx)
    // Coin(410,410,ctx)
    // Coin(510,510,ctx)



    ////////////////////////////////// create Hero //////////////////////
    Hero(this.state.map, this.state.heroCol, this.state.heroRow, ctx)
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
          <img id="coin" src={require('./coin-tile.png')}/>
          <img id="rock" src={require('./rock-tile.png')}/>
        </div>
      </div>
    )
  }
}

export default Game;
