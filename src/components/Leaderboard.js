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
      <div>
        <h3>Leaderboard</h3>
        <ol>
          {this.state.scores.map(score => <li key={score.id}>{score.username} {score.points}</li>)}
        </ol>
      </div>
    )
  }
}

export default Leaderboard
