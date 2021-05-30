// tic-tac-toe

import React from 'react'
import './Game1.css'

function Square(props){
  return (
    <button className={`${props.star ? 'ok ':''} square`} onClick={props.onClick}>{props.value}</button>
  )
}

class Board extends React.Component {
  renderSquare(i){
    return (
      <Square value={this.props.squares[i]} star={this.props.stars.includes(i)} onClick={()=>this.props.onClick(i)} />
    )
  }
  render(){
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      history: [
        {squares: new Array(9).fill(null)}
      ],
      xIsNext: true,
      stars: [],
      stepNumber: 0
    }
  }
  calculateWinner(squares){
    let lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    // 获胜
    let winner, stars
    for(let i=0;i<lines.length;i++){
      const [a, b, c] = lines[i]
      if(squares[a] && squares[a] === squares[b] && squares[a]===squares[c]){
        winner = squares[a]
        stars = lines[i]
        break
      }
    }
    // 平局
    let hasRest = false
    for(let i=0;i<squares.length;i++){
      if(squares[i]===null){
        hasRest = true
        break
      }
    }
    if(winner){
      return { winner: winner, stars: stars}
    }else if(!hasRest){
      return 'equl'
    }else{
      return null
    }
  }
  handleClick(i){
    let history = this.state.history.slice(0, this.state.stepNumber+1)
    const current = history[history.length - 1];
    const squares = current.squares.slice();    
    let res = this.calculateWinner(squares) 

    if(res || squares[i]){
      if(res.stars){
        this.setState({
          stars: res.stars
        })
      }
      return 
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'

    this.setState({
      history: history.concat({
        squares: squares
      }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  jumpTo(i){
    console.log(i)
    this.setState({
      stepNumber: i,
      xIsNext: step % 2 === 0
    })
  }

  render(){
    const history = this.state.history
    let squares = history[this.state.stepNumber].squares
    let res = this.calculateWinner(squares)
    let stars
    let status
    if(res){
      if(res === 'equl'){
        status = '平局'
      }else{
        status = 'winner: ' + res.winner
        stars = res.stars
      }
    }else{
      status = 'next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    const moves = history.map((val,move)=>{
      const desc = move ? 'Go to #' + move : 'Get Start'
      return  (
        <li key={move} onClick={()=>this.jumpTo(move)}>
          <button>{desc}</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} stars={stars || []} onClick={(i)=>this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className="status">
            {status} 
          </div>
          <div className="move">
            <ol>
              {moves} 
            </ol>
          </div>
        </div> 
      </div>
    )
  }
}

export default Game