"use client";

import React from "react";
// 1. O import do './Letras.css' foi removido
import styles from "./Forca.module.css"; // 2. Importamos o CSS Module

const Letras = ({ onGuess, guessedLetters }) => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  const handleButtonClick = (letter) => {
    onGuess(letter);
  };

  return (
    // 3. A className foi trocada para usar o 'styles' do CSS Module
    <div className={styles.teclado}>
      {letters.map((letter) => (
        <button
          key={letter}
          // 4. A className do botão também foi atualizada
          className={styles.tecla}
          onClick={() => handleButtonClick(letter)}
          // 5. Garantimos que a letra checada esteja em maiúsculo
          disabled={guessedLetters.includes(letter.toUpperCase())}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Letras;
