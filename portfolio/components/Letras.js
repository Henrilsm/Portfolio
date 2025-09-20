"use client";

import React from "react";
import "./Letras.css";

const Letras = ({ onGuess, guessedLetters }) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  const handleButtonClick = (letter) => {
    onGuess(letter);
  };

  return (
    <div className="letras-botoes">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => handleButtonClick(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Letras;
