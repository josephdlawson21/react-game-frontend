


import React from 'react'
import './App.css';
import Hero from './Hero'
import Coin from './Coin'
import Enemy from './Enemy'
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
    heroCol: 5,
    heroRow: 9,
    coins: [[6,5],[5,5],[4,5]],
    map: {},
    score: 0,
    enemyXY: [9,4]
  }

  checkCollision = (col, row) => {
    let coinCheck = this.state.coins.filter(coin => (coin[0] === col) && (coin[1] === row))

    if ([3,4].includes(this.state.map.getTile(col,row))) {
      return false

    } else if(coinCheck.length){
      let index = this.state.coins.indexOf(coinCheck[0])
      let newCoins = [...this.state.coins]
      newCoins.splice(index,1)
      this.setState({
        coins: newCoins,
        score: this.state.score + 10
      },() => console.log(this.state.score))
      return true

    } else {
      return true
    };
  }

  moveHero = (event) => {
    switch (event.key) {
      case 's':
        if(this.state.heroRow !== 9 && this.checkCollision((this.state.heroCol), (this.state.heroRow) + 1)){
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
        if(this.state.heroCol !== 9 && this.checkCollision((this.state.heroCol + 1), (this.state.heroRow))){
          this.setState({
            heroCol: this.state.heroCol + 1
          });
        }
        break;
    }
  }


  componentDidMount() {
    let map = {
      cols: 10,
      rows: 10,
      tsize: 60,
      tiles: [
        3,2,3,2,3,2,3,1,1,1,
        2,3,2,3,2,3,2,1,1,1,
        3,2,3,2,1,2,1,1,1,2,
        2,1,4,3,2,1,2,1,1,2,
        1,2,3,2,1,2,1,1,2,1,
        2,1,2,1,2,1,2,1,1,2,
        2,1,2,1,2,1,2,1,1,2,
        2,1,2,1,2,1,2,1,1,2,
        2,1,2,1,2,1,2,1,1,1,
        1,2,1,2,1,2,1,1,1,1
      ],
      getTile: function(col, row) {
        return this.tiles[row * map.cols + col]
      }
    }
    this.setState({
      map: map
    });

    ///////// set interval for ghost //////////
    let direction;
    setInterval(()=>{
      if(this.state.enemyXY[0] === 0){
        direction = true
      }else if (this.state.enemyXY[0] === 9){
        direction = false
      }

      if(direction){
        this.setState({
          enemyXY: [(this.state.enemyXY[0] + 1), 4]
        })
      } else {
        this.setState({
          enemyXY: [(this.state.enemyXY[0] - 1), 4]
        })
      }
    }, 300)

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
              0, // source x
              0, // source y
              this.state.map.tsize, // source width
              this.state.map.tsize, // source height
              c * this.state.map.tsize, // target x
              r * this.state.map.tsize, // target y
              this.state.map.tsize, // target width
              this.state.map.tsize // target height
            );


            // ctx.drawImage(
            //   grass, // image
            //   c * this.state.map.tsize, // target x
            //   r * this.state.map.tsize, // target y
            // );
            break;
          case 2:
            ctx.drawImage(
              dirt, // image
              0, // source x
              0, // source y
              this.state.map.tsize, // source width
              this.state.map.tsize, // source height
              c * this.state.map.tsize, // target x
              r * this.state.map.tsize, // target y
              this.state.map.tsize, // target width
              this.state.map.tsize // target height
            );
            // ctx.drawImage(
            //   dirt, // image
            //   c * this.state.map.tsize, // target x
            //   r * this.state.map.tsize, // target y
            // );
            break;
          case 3:
            ctx.drawImage(
              grass, // image
              0, // source x
              0, // source y
              this.state.map.tsize, // source width
              this.state.map.tsize, // source height
              c * this.state.map.tsize, // target x
              r * this.state.map.tsize, // target y
              this.state.map.tsize, // target width
              this.state.map.tsize // target height
            );
            ctx.drawImage(
              rock, // image
              0, // source x
              0, // source y
              this.state.map.tsize, // source width
              this.state.map.tsize, // source height
              (c * this.state.map.tsize) + 6, // target x
              (r * this.state.map.tsize) + 6, // target y
              this.state.map.tsize, // target width
              this.state.map.tsize // target height
            );


            // ctx.drawImage(
            //   grass, // image
            //   c * this.state.map.tsize, // target x
            //   r * this.state.map.tsize, // target y
            // );
            // ctx.drawImage(
            //   rock, // image
            //   (c * this.state.map.tsize) + 10, // target x
            //   (r * this.state.map.tsize) + 10, // target y
            // );
            break;
          case 4:
            ctx.drawImage(
              dirt, // image
              0, // source x
              0, // source y
              this.state.map.tsize, // source width
              this.state.map.tsize, // source height
              c * this.state.map.tsize, // target x
              r * this.state.map.tsize, // target y
              this.state.map.tsize, // target width
              this.state.map.tsize // target height
            );
            ctx.drawImage(
              rock, // image
              0, // source x
              0, // source y
              this.state.map.tsize, // source width
              this.state.map.tsize, // source height
              (c * this.state.map.tsize) + 6, // target x
              (r * this.state.map.tsize) + 6, // target y
              this.state.map.tsize, // target width
              this.state.map.tsize // target height
            );

            // ctx.drawImage(
            //   dirt, // image
            //   c * this.state.map.tsize, // target x
            //   r * this.state.map.tsize, // target y
            // );
            // ctx.drawImage(
            //   rock, // image
            //   (c * this.state.map.tsize) + 10, // target x
            //   (r * this.state.map.tsize) + 10, // target y
            // );
            break;
        }

      }
    }


    /////////////////////////////////create coins //////////////////////////
    // Coin(110,110,ctx)

    this.state.coins.forEach((coin)=> Coin(coin[0], coin[1], ctx, this.state.map))
    ////////////////////////////////// Make Enemy /////////////////////////

    Enemy(this.state.map, this.state.enemyXY, ctx)


    ////////////////////////////////// create Hero //////////////////////
    Hero(this.state.map, this.state.heroCol, this.state.heroRow, ctx)
    window.addEventListener('keypress', this.moveHero)



    requestAnimationFrame(() => {this.update()})
  }


  render () {

    return(
      <div className="App">
        <h1 className="title">super cool game</h1>
        <h3 className="title">Score: {this.state.score}</h3>
        <canvas id="canvas" width="600" height="600">

        </canvas>
        <div className="imgHider">
          <img id="dirt" src={require('./assets/dirt-tile.png')}/>
          <img id="grass" src={require('./assets/grass-tile.png')}/>
          <img id="character" src={require('./assets/character-tile.png')}/>
          <img id="coin" src={require('./assets/coin-tile.png')}/>
          <img id="rock" src={require('./assets/rock-tile.png')}/>
          <img id="ghost" src={require('./assets/ghost-tile.png')}/>
        </div>
      </div>
    )
  }
}

export default Game;
