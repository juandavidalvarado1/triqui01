import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

const Square = ({value, onClick}) => {
  
    return (
      <button 
      className="square" 
      onClick={onClick}
      >
        {value}
      </button>
    );
  
}



const Board = props => {

  const renderSquare = (i) => {
    return (
    < Square 
      value={props.squares[i]}
      onClick = {() => props.onClick(i)}
      />
    );
  }
 
    return (
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  
}

// class Game extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       history:[{
//         squares: Array(9).fill(null),
//       }],
//       stepNumber:0,
//       xIsNext: true,
      
 
//     };
//   }

//   handleClick(i){
//     const history=this.state.history.slice(0,this.state.stepNumber +1);
//     const current=history[history.length-1];
//     const squares=current.squares.slice();
//    // const localsquares = this.state.squares.slice();
//     if(calculateWinner(squares)||squares[i]){
//       return;
//     }
//     squares[i]=this.state.xIsNext ? 'x':'o';
//     this.setState({
//       history:history.concat([{
//         squares : squares,
//       }]),
//       stepNumber: history.length,
//       xIsNext: !this.state.xIsNext,

//     }); 
//   }

//   jumpTo(step){
//     this.setState({
//       stepNumber:step,
//       xIsNext:(step % 2) === 0,

//     });

//   }

//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber]
//     const winner = calculateWinner(current.squares);

//     const moves = history.map((step, move) => {
//       const desc = move ?
//         'Go to move #' + move :
//         'Go to game start';
//       return (
//         <li key={move}>
//           <button onClick={() => this.jumpTo(move)}>{desc}</button>
//         </li>
//       );
//     });

//     let status;
//     if(winner){
//       status='Winner: '+ winner;
//     }
//     else{
//       status = 'Next player: '+(this.state.xIsNext ? 'x':'o');
//     }
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board
//           squares={current.squares} 
//           onClick={(i) => this.handleClick(i)}/>
//         </div>
//         <div className="game-info">
//           <div>{ status }</div>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     );
//   }
//   }

  const FunctionalGame = props => {

    const [history, sethistory] = useState([{squares: Array(9).fill(null)}]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setxIsNext] = useState(true);

    const handleClick = (i) =>{
      const Localhistory = history.slice(0, stepNumber +1);
      const current = Localhistory[Localhistory.length-1];
      const squares = current.squares.slice();
     // const localsquares = this.state.squares.slice();
      if(calculateWinner(squares)||squares[i]){
        return;
      }
      squares[i]=xIsNext ? 'x':'o';
      sethistory([...Localhistory, { squares }]);
      setStepNumber(Localhistory.length);
      setxIsNext(!xIsNext);
    }
  
    const jumpTo = (step) =>{
      setStepNumber(step);
      setxIsNext((step % 2) === 0);  
    }
  
  
      const Localhistory = history;
      const current = Localhistory[stepNumber]
      const winner = calculateWinner(current.squares);
  
      const moves = Localhistory.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status = '';
      if(winner){
        status='Winner: '+ winner;
      }
      else{
        status = 'Next player: '+(xIsNext ? 'x':'o');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board
            squares={current.squares} 
            onClick={handleClick}/>
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    
    }

// ========================================

ReactDOM.render(
  <FunctionalGame />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}