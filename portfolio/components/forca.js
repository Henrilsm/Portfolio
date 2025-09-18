"use client";

import React, { useState } from "react";

const WORDS = ["Messi", "Neymar", "Santa", "Sport", "Nautico"];

function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

const MAX_ATTEMPTS = 6;

const Forca = () => {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [input, setInput] = useState("");
  const [gameOver, setGameOver] = useState(false);

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

    if (!word.includes(guess)) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) setGameOver(true);
    } else if (
         word
      .split("")
      .every((l) => guessedLetters.includes(l.toLowerCase()) || l.toLowerCase() === guess)
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
          Guess
        </button>
      </form>
      <p>Guessed Letters: {guessedLetters.join(", ")}</p>
      {gameOver && (
        <div>
          <h3>
            {word.split("").every((l) => guessedLetters.includes(l))
              ? "Parabéns! Você ganhou!"
              : `Você perdeu! A palavra era "${word}".`}
          </h3>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Forca;
