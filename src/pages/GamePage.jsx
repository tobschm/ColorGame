import { useEffect, useState } from "react";
import './GamePage.css';

function GamePage() {
  const [status, setStatus] = useState("Warte auf Sprachbefehl...");
  const [writtenColor, setWrittenColor] = useState("");
  const [textColorRGB, setTextColorRGB] = useState("");
  const [textColor, setTextColor] = useState("");
  const [round, setRound] = useState(1);
  const [recognition, setRecognition] = useState(null);

  // Zufällige Farbe generieren
  const createRandom = () => {
    // get random text
    const colors = ['Schwarz', 'Rot', 'Grün', 'Blau', 'Gelb'];
    const index = Math.floor(Math.random() * colors.length);
    setWrittenColor(colors[index]);

    // get random text color
    const rgbs = {
      schwarz: 'rgb(0, 0, 0)',
      rot: 'rgb(255, 0, 0)',
      grün: 'rgb(0, 128, 0)',
      blau: 'rgb(0, 0, 255)',
      gelb: 'rgb(231, 231, 20)'
    };
    const keys = Object.keys(rgbs);
    const rgbIndex = Math.floor(Math.random() * colors.length);
    setTextColorRGB(rgbs[keys[rgbIndex]]);
    setTextColor(keys[rgbIndex]);
    console.log("🎲 Zufällige Ziel-Farbe (textColor):", keys[rgbIndex]);
  };

  useEffect(() => {
    createRandom();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("❌ Dein Browser unterstützt keine Spracherkennung.");
      return;
    }

    const newRecognition = new SpeechRecognition();
    newRecognition.lang = "de-DE";
    newRecognition.continuous = true;
    newRecognition.interimResults = false;

    newRecognition.onstart = () => {
      setStatus("🎤 Mikrofon aktiviert – sprich jetzt!");
    };

    newRecognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

      setStatus(`Erkannt: "${transcript}"`);

      console.log("🎧 Erkanntes Wort:", transcript);
      console.log("🔍 Erwartete Farbe:", textColor);

      if (transcript.includes(textColor)) {
        handleCorrectAnswer();
      }
    };

    newRecognition.onerror = (event) => {
      setStatus(`Fehler: ${event.error}`);
    };

    newRecognition.start();
    setRecognition(newRecognition);

    // Cleanup
    return () => {
      newRecognition.stop();
    };
  }, []);

  const handleCorrectAnswer = () => {
    if (round < 10) {
      setStatus("✅ Richtig!");
      createRandom();
      setRound(prev => prev + 1);
    } else {
      setStatus("Ende");
      if (recognition) {
        recognition.stop();
      }
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <p>{status}</p>
      <h2 style={{ color: textColorRGB }}>{writtenColor}</h2>
      <p>{round}/10</p>
    </div>
  );
}

export default GamePage;
