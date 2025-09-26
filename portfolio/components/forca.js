"use client";

import { useState, useEffect, useCallback } from "react";
import { palavras } from "@/lib/palavras";
import styles from "./Forca.module.css";
import Letras from "./Letras"; // 1. IMPORTE O SEU COMPONENTE

const MAX_ERROS = 6;

const selecionarPalavra = () =>
  palavras[Math.floor(Math.random() * palavras.length)];

export default function Forca() {
  const [palavra, setPalavra] = useState("");
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const iniciarNovoJogo = useCallback(() => {
    const novaPalavra = selecionarPalavra();
    setPalavra(novaPalavra.toUpperCase()); // Garante que a palavra esteja em maiúsculas
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
    setJogoFinalizado(false);
    setMensagem("");
  }, []);

  useEffect(() => {
    iniciarNovoJogo();
  }, [iniciarNovoJogo]);

  const handleTentativa = (letra) => {
    const letraMaiuscula = letra.toUpperCase();
    if (
      jogoFinalizado ||
      letrasAdivinhadas.includes(letraMaiuscula) ||
      letrasErradas.includes(letraMaiuscula)
    )
      return;

    if (palavra.includes(letraMaiuscula)) {
      setLetrasAdivinhadas([...letrasAdivinhadas, letraMaiuscula]);
    } else {
      setLetrasErradas([...letrasErradas, letraMaiuscula]);
    }
  };

  useEffect(() => {
    if (palavra === "") return;

    const vitoria = palavra
      .split("")
      .every((letra) => letrasAdivinhadas.includes(letra));
    if (vitoria) {
      setJogoFinalizado(true);
      setMensagem("Parabéns, você venceu!");
    }

    if (letrasErradas.length >= MAX_ERROS) {
      setJogoFinalizado(true);
      setMensagem(`Você perdeu! A palavra era: ${palavra}`);
    }
  }, [letrasAdivinhadas, letrasErradas, palavra]);

  const palavraExibida = palavra
    .split("")
    .map((letra) => (letrasAdivinhadas.includes(letra) ? letra : "_"))
    .join(" ");

  // 2. A VARIÁVEL 'alfabeto' E O MAPA DE BOTÕES FORAM REMOVIDOS DAQUI

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Jogo da Forca</h1>
      <div className={styles.forcaContainer}>
        <svg height="250" width="200" className={styles.forcaSvg}>
          <line x1="10" y1="230" x2="150" y2="230" />
          <line x1="50" y1="230" x2="50" y2="20" />
          <line x1="50" y1="20" x2="120" y2="20" />
          <line x1="120" y1="20" x2="120" y2="50" />

          {letrasErradas.length > 0 && (
            <circle cx="120" cy="70" r="20" className={styles.bonecoParte} />
          )}
          {letrasErradas.length > 1 && (
            <line
              x1="120"
              y1="90"
              x2="120"
              y2="150"
              className={styles.bonecoParte}
            />
          )}
          {letrasErradas.length > 2 && (
            <line
              x1="120"
              y1="110"
              x2="90"
              y2="130"
              className={styles.bonecoParte}
            />
          )}
          {letrasErradas.length > 3 && (
            <line
              x1="120"
              y1="110"
              x2="150"
              y2="130"
              className={styles.bonecoParte}
            />
          )}
          {letrasErradas.length > 4 && (
            <line
              x1="120"
              y1="150"
              x2="90"
              y2="180"
              className={styles.bonecoParte}
            />
          )}
          {letrasErradas.length > 5 && (
            <line
              x1="120"
              y1="150"
              x2="150"
              y2="180"
              className={styles.bonecoParte}
            />
          )}
        </svg>
      </div>

      <p className={styles.palavra}>{palavraExibida}</p>

      {jogoFinalizado ? (
        <div className={styles.mensagemFinal}>
          <p>{mensagem}</p>
          <button onClick={iniciarNovoJogo} className={styles.botao}>
            Jogar Novamente
          </button>
        </div>
      ) : (
        // 3. SEU COMPONENTE FOI ADICIONADO AQUI
        <Letras
          onGuess={handleTentativa}
          guessedLetters={[...letrasAdivinhadas, ...letrasErradas]}
        />
      )}

      <div className={styles.infoJogo}>
        <p>Letras erradas: {letrasErradas.join(", ")}</p>
        <p>Tentativas restantes: {MAX_ERROS - letrasErradas.length}</p>
      </div>
    </div>
  );
}
