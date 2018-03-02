


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
    heroXy: [],
    coins: [],
    map: {},
    score: 0,
    ghostXy: [9,4]
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
      })
      return true
    } else if ((this.state.ghostXy[0] === col) && (this.state.ghostXy[1] === row)) {
      console.log("ded");
      this.setState({
        heroXy: [0,9],
        score: 0,
        coins: [[6,5],[5,5],[4,5]]
      });
    }else {
      return true
    };
  }

  moveHero = (event) => {
    switch (event.key) {
      case 's':
        if(this.state.heroXy[1] !== 9 && this.checkCollision((this.state.heroXy[0]), (this.state.heroXy[1]) + 1)){
          this.setState({
            heroXy: [this.state.heroXy[0],(this.state.heroXy[1] + 1)]
          });
        }
        break;
      case 'w':
        if(this.state.heroXy[1] !== 0 && this.checkCollision((this.state.heroXy[0]), (this.state.heroXy[1] - 1))){
          this.setState({
            heroXy: [this.state.heroXy[0],(this.state.heroXy[1] - 1)]
          });
        }
        if (this.state.heroXy[0] == 9 && this.state.heroXy[1] === 0) {
          console.log("winner");
          this.setState({
            heroXy: [0,9],
            coins: [[6,5],[5,5],[4,5]]
          });
        }
        break;
      case 'a':
        if(this.state.heroXy[0] !== 0 && this.checkCollision((this.state.heroXy[0] - 1), (this.state.heroXy[1]))){
          this.setState({
            heroXy: [(this.state.heroXy[0] - 1), this.state.heroXy[1]]
          });
        }
        break;
      case 'd':
        if(this.state.heroXy[0] !== 9 && this.checkCollision((this.state.heroXy[0] + 1), (this.state.heroXy[1]))){
          this.setState({
            heroXy: [(this.state.heroXy[0] + 1), this.state.heroXy[1]]
          });
        }
        if (this.state.heroXy[0] == 9 && this.state.heroXy[1] === 0) {
          console.log("winner");
          this.setState({
            heroXy: [0,9],
            coins: [[6,5],[5,5],[4,5]]
          });
        }
        break;
    }

  }


  componentDidMount() {
    let map = {
      start: [0,9],
      cols: 10,
      rows: 10,
      coins: [[6,5],[5,5],[4,5]],
      ghosts: [],
      tsize: 60,
      tiles: [
        3,2,3,2,3,2,3,1,1,5,
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
      map: map,
      heroXy: [map.start[0], map.start[1]],
      coins: map.coins
    });

    ///////// set interval for ghost //////////
    let direction;
    setInterval(()=>{
      if(this.state.ghostXy[0] === 0){
        direction = true
      }else if (this.state.ghostXy[0] === 9){
        direction = false
      }

      if(direction){
        this.setState({
          ghostXy: [(this.state.ghostXy[0] + 1), 4]
        })
      } else {
        this.setState({
          ghostXy: [(this.state.ghostXy[0] - 1), 4]
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
    let winner = document.getElementById('winner');
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
          case 5:
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
              winner, // image
              0, // source x
              0, // source y
              this.state.map.tsize, // source width
              this.state.map.tsize, // source height
              c * this.state.map.tsize, // target x
              r * this.state.map.tsize, // target y
              this.state.map.tsize, // target width
              this.state.map.tsize // target height
            );

            break;
        }

      }
    }


    /////////////////////////////////create coins //////////////////////////
    // Coin(110,110,ctx)

    this.state.coins.forEach((coin)=> Coin(coin[0], coin[1], ctx, this.state.map))



    ////////////////////////////////// create Hero //////////////////////
    Hero(this.state.map, this.state.heroXy, ctx)
    window.addEventListener('keypress', this.moveHero)

    ////////////////////////////////// Make Enemy /////////////////////////
    Enemy(this.state.map, this.state.ghostXy, ctx)
    if ((this.state.ghostXy[0] === (this.state.heroXy[0])) && (this.state.ghostXy[1] === this.state.heroXy[1])) {
      console.log("ghost got ya")
      this.setState({
        heroXy: [0,9],
        score: 0,
        coins: [[6,5],[5,5],[4,5]]
      });
    }


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
          <img id="exit" src={require('./assets/grass-tile-exit.png')}/>
          <img id="character" src={require('./assets/character-tile.png')}/>
          <img id="coin" src={require('./assets/coin-tile.png')}/>
          <img id="rock" src={require('./assets/rock-tile.png')}/>
          <img id="ghost" src={require('./assets/ghost-tile.png')}/>
          <img id="winner" src={require('./assets/Winner.png')}/>
        </div>
      </div>
    )
  }
}

export default Game;
