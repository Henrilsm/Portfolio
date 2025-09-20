"use client";

import React, { useState, useEffect } from "react";
import Letras from "./Letras";
import "./forca.css";

const WORDS = ["Messi", "Neymar", "Santa", "Sport", "Nautico"];

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}
const MAX_ATTEMPTS = 6;

function renderHangman(attempts) {
  const stages = [
    `
   +---+
   |   |
       |
       |
       |
       |
  ========`,
    `
   +---+
   |   |
  (_)  |
       |
       |
       |
  ========`,
    `
   +---+
   |   |
  (_)  |
   |   |
       |
       |
  ========`,
    `
   +---+
   |   |
  (_)  |
  /|   |
       |
       |
  ========`,
    `
   +---+
   |   |
  (_)  |
  /|\\  |
       |
       |
  ========`,
    `
   +---+
   |   |
  (_)  |
  /|\\  |
   /   |
       |
  ========`,
    `
   +---+
   |   |
  (_)  |
  /|\\  |
  / \\  |
       |
========`,
  ];
  return stages[attempts];
}

const Forca = () => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [input, setInput] = useState("");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setWord(getRandomWord());
  }, []);

  const maskedWord = word
    .split("")
    .map((letter) =>
      guessedLetters.includes(letter.toLowerCase()) ? letter : "_"
    )
    .join(" ");

  const handleGuess = (guess) => {
    // Estas linhas foram removidas:
    // e.preventDefault();
    // setInput("");
    if (gameOver || !guess) return;

    // Este trecho de código foi corrigido:
    const normalizedGuess = guess.toLowerCase();
    if (guessedLetters.includes(normalizedGuess)) return;
    setGuessedLetters([...guessedLetters, normalizedGuess]);

    if (!word.toLowerCase().includes(normalizedGuess)) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) setGameOver(true);
    } else if (
      word
        .toLowerCase()
        .split("")
        .every((l) => guessedLetters.includes(l) || l === normalizedGuess)
    ) {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setAttempts(0);
    setInput("");
    setGameOver(false);
  };

  return (
    <>
      <h2>Jogo da Forca</h2>
      <pre>{renderHangman(attempts)}</pre>
      <p className="palavra-oculta">{maskedWord}</p>
      <p>Tentativas Restantes: {MAX_ATTEMPTS - attempts}</p>

      {/* Substitua o formulário de input pelo componente de botões */}
      <Letras onGuess={handleGuess} guessedLetters={guessedLetters} />

      <p className="letras-chutadas">
        Letras Chutadas: <span>{guessedLetters.join(", ")}</span>
      </p>
      {gameOver && (
        <div className="mensagem-final">
          <h3
            className={
              word
                .toLowerCase()
                .split("")
                .every((l) => guessedLetters.includes(l.toLowerCase()))
                ? "vitoria"
                : "derrota"
            }
          >
            {word
              .toLowerCase()
              .split("")
              .every((l) => guessedLetters.includes(l.toLowerCase()))
              ? "Parabéns! Você ganhou!"
              : `Você perdeu! A palavra era "${word}".`}
          </h3>
          <button onClick={handleRestart} className="btn-reiniciar">
            Reiniciar
          </button>
        </div>
      )}
    </>
  );
};

export default Forca;
