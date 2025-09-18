"use client";

import React, { useState, useEffect } from "react";

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

  const handleGuess = (e) => {
    e.preventDefault();
    if (gameOver || !input) return;

    const guess = input.toLowerCase();
    setInput("");

    if (guessedLetters.includes(guess)) return;

    setGuessedLetters([...guessedLetters, guess]);

    if (!word.toLowerCase().includes(guess)) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) setGameOver(true);
    } else if (
     word
      .toLowerCase()
      .split("")
      .every((l) => guessedLetters.includes(l) || l === guess)
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
    <div style={{ textAlign: "center" }}>
      <h2>Jogo da Forca</h2>
      <pre>
        {renderHangman(attempts)}
      </pre>
      <p>Palavra: {maskedWord}</p>
      <p>Tentativas Restantes: {MAX_ATTEMPTS - attempts}</p>
      <form onSubmit={handleGuess}>
        <input
          type="text"
          maxLength={1}
          value={input}
          disabled={gameOver}
          onChange={(e) => setInput(e.target.value.replace(/[^a-zA-Z]/g, ""))}
        />
        <button type="submit" disabled={gameOver || !input}>
          Chutar
        </button>
      </form>
      <p>Palavras Tentadas: {guessedLetters.join(", ")}</p>
      {gameOver && (
        <div>
          <h3>
            {word
              .split("")
              .every((l) => guessedLetters.includes(l.toLowerCase()))
              ? "Parabéns! Você ganhou!"
              : `Você perdeu! A palavra era "${word}".`}
          </h3>
          <button onClick={handleRestart}>Reiniciar</button>
        </div>
      )}
    </div>
  );
};

export default Forca;
