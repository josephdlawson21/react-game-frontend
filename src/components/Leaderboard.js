import React from 'react'

class Leaderboard extends React.Component {

  state = {
    scores: []
  }

  componentDidMount(){
    this.fetchScores()
  }

  fetchScores = () => {
    fetch('http://localhost:3000/scores')
    .then(res => res.json())
    .then(json => {
      let newJson;
      json.length >= 10 ? newJson = json.slice(0,9) : newJson = json
      this.setState({
        scores: newJson
      }, () => console.log(this.state.scores))
    })
  }

  render(){
    return (
      <div className="container">
        <h3 className="center-align">Leaderboard</h3>
        <table className="bordered">
          <thead>
            <tr>
                <th>Player</th>
                <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.state.scores.map(score => {
              return (<tr key={score.id}>
                        <td>
                          {score.username}
                        </td>
                        <td>
                          {score.points}
                        </td>
                      </tr>)
            })}
          </tbody>


        </table>
      </div>
    )
  }
}

export default Leaderboard
