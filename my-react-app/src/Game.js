import React from 'react'
import './Game.css'

class Board extends React.Component {
  
  renderSquare(i){
    return (
      <button className="square" onClick={()=>this.props.onClick(i)}>{this.props.squares[i]}</button>
    )
  }
  render (){
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
      stepNumber: 0,
      xIsNext: true
    }
  }
  handleClick(i){
    const history  = this.state.history.slice(0, this.state.stepNumber+1)
    const current = history[history.length-1]
    let squares = current.squares.slice()
    let winner = this.calculateWinner(squares)
    if(winner || squares[i]){
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'

    this.setState({
      history: history.concat([{squares: squares}]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
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
    for(let i=0;i<lines.length;i++){
      const [ a, b, c] = lines[i]
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a]
      }
    }
    return null
  }
  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }

  render(){
    const history  = this.state.history
    const current = history[this.state.stepNumber]
    const squares = current.squares

    let status
    
    const winner = this.calculateWinner(squares)
    if(winner){
      status = `Winner is: ${winner}`
    }else{
      status = `Next player: ${this.state.xIsNext ? 'X': 'O'}`
    }
    const moves = history.map((val, move)=>{
      const desc = move ? `Goto #${move}`: 'Get Start'
      return (
        <li key={move} onClick={()=>this.jumpTo(move)}>
          <button>{desc}</button>
        </li>
      )
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board  squares={squares} onClick={(i)=>this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div className="game-status">
            {status}
          </div>
          <div className="game-move">
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