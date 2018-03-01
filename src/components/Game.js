


import React from 'react'
import { Loop, Stage, World } from 'react-game-kit';

class Game extends React.Component {
  render () {
    return(
      <div>
        <Loop>
          <Stage style={{ background: '#3a9bdc' }}>
            <World>

            </World>
          </Stage>
        </Loop>
      </div>
    )
  }
}

export default Game;
