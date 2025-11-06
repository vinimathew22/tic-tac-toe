import React from "react";

export default function Square({ value, onClick }) {
  const colorClass =
    value === "X" ? "square-x" : value === "O" ? "square-o" : "";

  return (
    <button className={`square ${colorClass}`} onClick={onClick}>
      {value}
    </button>
  );
}
