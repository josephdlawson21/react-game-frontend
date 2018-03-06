


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
var animationFrameLUL;

class Game extends React.Component {
  state = {
    context: null,
    heroXy: [],
    coins: [],
    map: {},
    score: 0,
    ghostsH: [],
    ghostsV: [],
    loop: true
  }

  moveGhosts = () => {
    this.state.ghostsV.forEach((ghost, index) => {
      let directionV;
      setInterval(()=>{
      //// iterate through horizontal ghosts

        /////// determine direction
        if(this.state.ghostsV[index][1] === 0){
          directionV = true
        }else if (this.state.ghostsV[index][1] === 9){
          directionV = false
        }

        ///// update array in state
        if(directionV){
          //////////finding the ghost coordinaated and updating
          let newGhost = [...this.state.ghostsV]
          newGhost[index] = [ghost[0], (newGhost[index][1] + 1)]
          this.setState({
            ghostsV: [...newGhost]
          })
        } else {
          //////////finding the ghost coordinaated and updating
          let newGhost = [...this.state.ghostsV]
          newGhost[index] = [ghost[0], (newGhost[index][1] - 1)]
          this.setState({
            ghostsV: [...newGhost]
          })
        }
      }, 300)

    })


    this.state.ghostsH.forEach((ghost, index) => {

      let directionH;
      setInterval(()=>{
      //// iterate through horizontal ghosts

        /////// determine direction
        if(this.state.ghostsH[index][0] === 0){
          directionH = true
        }else if (this.state.ghostsH[index][0] === 9){
          directionH = false
        }

        ///// update array in state
        if(directionH){
          //////////finding the ghost coordinaated and updating
          let newGhost = [...this.state.ghostsH]
          newGhost[index] = [(newGhost[index][0] + 1), ghost[1]]
          this.setState({
            ghostsH: [...newGhost]
          })
        } else {
          //////////finding the ghost coordinaated and updating
          let newGhost = [...this.state.ghostsH]
          newGhost[index] = [(newGhost[index][0] - 1), ghost[1]]
          this.setState({
            ghostsH: [...newGhost]
          })
        }
      }, 300)

    })
  }

  checkCollision = (col, row) => {
    let coinCheck = this.state.coins.filter(coin => (coin[0] === col) && (coin[1] === row))
    let ghostCheckH = this.state.ghostsH.filter(ghost => (ghost[0] === col) && (ghost[1] === row))
    let ghostCheckV = this.state.ghostsV.filter(ghost => (ghost[0] === col) && (ghost[1] === row))

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
    } else if (ghostCheckH.length || ghostCheckV.length) {
      console.log("ded");
      this.postScore(this.state.score)
      this.setState({
        heroXy: [0,9],
        score: 0,
        coins: [[0,0],[2,7],[6,5],[4,5],[7,7],[9,7],[5,8],[4,9],[2,3],[8,6],[6,0],[4,0],[5,2]],
      });
    }else {
      return true
    };
  }

  postScore = (score) => {
    fetch('http://localhost:3000/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
      },
      body: JSON.stringify({
        score: score
      })
    })
  }

  moveHero = (event) => {
    console.log(event.which);
    switch (event.which) {
      case 83:
      case 40:
        event.preventDefault()
        if(this.state.heroXy[1] !== 9 && this.checkCollision((this.state.heroXy[0]), (this.state.heroXy[1]) + 1)){
          this.setState({
            heroXy: [this.state.heroXy[0],(this.state.heroXy[1] + 1)]
          });
        }
        break;
      case 38:
      case 87:
        event.preventDefault()
        if(this.state.heroXy[1] !== 0 && this.checkCollision((this.state.heroXy[0]), (this.state.heroXy[1] - 1))){
          this.setState({
            heroXy: [this.state.heroXy[0],(this.state.heroXy[1] - 1)]
          });
        }
        if (this.state.heroXy[0] == 9 && this.state.heroXy[1] === 0) {
          this.setState({
            heroXy: [0,9],
            coins: [[0,0],[2,7],[6,5],[4,5],[7,7],[9,7],[5,8],[4,9],[2,3],[8,6],[6,0],[4,0],[5,2]],
          });
        }
        break;
      case 65:
      case 37:
        event.preventDefault()
        if(this.state.heroXy[0] !== 0 && this.checkCollision((this.state.heroXy[0] - 1), (this.state.heroXy[1]))){
          this.setState({
            heroXy: [(this.state.heroXy[0] - 1), this.state.heroXy[1]]
          });
        }
        break;
      case 39:
      case 68:
        event.preventDefault()
        if(this.state.heroXy[0] !== 9 && this.checkCollision((this.state.heroXy[0] + 1), (this.state.heroXy[1]))){
          this.setState({
            heroXy: [(this.state.heroXy[0] + 1), this.state.heroXy[1]]
          });
        }
        if (this.state.heroXy[0] == 9 && this.state.heroXy[1] === 0) {
          console.log("winner");
          this.setState({
            heroXy: [0,9],
            coins: [[0,0],[2,7],[6,5],[4,5],[7,7],[9,7],[5,8],[4,9],[2,3],[8,6],[6,0],[4,0],[5,2]],
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
      coins: [[0,0],[2,7],[6,5],[4,5],[7,7],[9,7],[5,8],[4,9],[2,3],[8,6],[6,0],[4,0],[5,2]],
      ghostsH: [],
      ghostsV: [],
      heroXy: [],
      tsize: 60,
      tiles: [
        1,1,1,3,1,3,1,3,1,5,
        1,3,1,1,1,3,1,3,1,3,
        1,3,3,3,1,1,1,3,1,1,
        1,3,1,3,3,3,3,3,1,3,
        1,1,1,3,1,1,1,1,1,1,
        2,4,2,4,2,4,2,4,2,4,
        2,4,2,4,2,4,2,4,2,4,
        2,4,2,2,2,4,2,2,4,2,
        2,4,4,4,4,2,2,4,4,2,
        2,2,2,2,2,4,2,2,2,2
      ],
      getTile: function(col, row) {
        return this.tiles[row * map.cols + col]
      }
    }
    this.setState({
      map: map,
      heroXy: [map.start[0], map.start[1]],
      coins: map.coins,
      ghostsH: [[3,4],[2,1],[7,7],[1,0],[4,5]],
      ghostsV: [[8,0],[6,9]]

    },() => this.moveGhosts());

    ///////// set interval for ghost //////////


   requestAnimationFrame(() => this.update());
  }

  update = () => {
    /////////////////////////create map /////////////////////////
    let dirt = document.getElementById('dirt');
    let path = document.getElementById('path');
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
            case 6:
              ctx.drawImage(
                path, // image
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
    window.addEventListener('keydown', this.moveHero)

    ////////////////////////////////// Make Enemy /////////////////////////
    this.state.ghostsH.forEach((ghost) => {
      Enemy(this.state.map, ghost, ctx)
    })

    this.state.ghostsV.forEach((ghost) => {
      Enemy(this.state.map, ghost, ctx)
    })

    //////////// check for ghost impact
    let ghostCheckH = this.state.ghostsH.filter(ghost => (ghost[0] === this.state.heroXy[0]) && (ghost[1] === this.state.heroXy[1]))
    let ghostCheckV = this.state.ghostsV.filter(ghost => (ghost[0] === this.state.heroXy[0]) && (ghost[1] === this.state.heroXy[1]))
    if (ghostCheckH.length || ghostCheckV.length) {
      console.log("ghost got ya")
      this.postScore(this.state.score)
      this.setState({
        heroXy: [0,9],
        score: 0,
        coins: [[0,0],[2,7],[6,5],[4,5],[7,7],[9,7],[5,8],[4,9],[2,3],[8,6],[6,0],[4,0],[5,2]],
      });
    }

    animationFrameLUL = requestAnimationFrame(() => {this.update()})
    animationFrameLUL
  }

  componentWillUnmount(){
    window.cancelAnimationFrame(animationFrameLUL)
    window.removeEventListener('keydown', this.moveHero)
  }

  render () {
    return(
      <div className="App">
        <h4 className="score">Score: {this.state.score}</h4>
        <canvas id="canvas" width="600" height="600">

        </canvas>
        <div className="imgHider">
          <img id="dirt" src={require('./assets/dirt-tile.png')}/>
          <img id="grass" src={require('./assets/grass-tile.png')}/>
          <img id="path" src={require('./assets/path-tile.png')}/>
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
