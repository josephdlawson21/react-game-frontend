


import React from 'react'
import './App.css';

class Game extends React.Component {


  componentDidMount() {

    let tiles = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,1,0,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ]

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let dirt = document.getElementById('dirt');
    let grass = document.getElementById('grass');

    for(let i = 0; i < tiles.length; i++){
      for(let j = 0; j < tiles[i].length; j++){
        if(tiles[i][j] === 0){
          ctx.drawImage(dirt, 100*i, 100*j);
        }else if(tiles[i][j] === 1){
          ctx.drawImage(grass, 100*i, 100*j);
        }
      }
    }

  }


  render () {

    return(
      <div className="App">
        <h1 className="title">super cool game</h1>
        <canvas id="canvas" width="600" height="600">

        </canvas>
        <div className="imgHider">
          <img id="dirt" src={require('./dirt-tile.png')}/>
          <img id="grass" src={require('./grass-tile.png')}/>
        </div>
      </div>
    )
  }
}

export default Game;
