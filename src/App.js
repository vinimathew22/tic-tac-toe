import React, { useState } from "react";
import Board from "./components/Board";
import "./App.css";

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[timeInHistory.length - 1];
    const squares = [...current];
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const winner = calculateWinner(history[stepNumber]);
  const status = winner
    ? `🎉 Winner: ${winner}!`
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="game">
      <h1 className="title">Tic Tac Toe</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info">
        <h2 className="status">{status}</h2>
        <div className="moves">
          {history.map((_, move) => {
            const desc = move ? `Go to move #${move}` : "Restart Game";
            return (
              <button key={move} onClick={() => jumpTo(move)}>
                {desc}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
